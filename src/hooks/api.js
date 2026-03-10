/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This hook provides methods to interact with external APIs.
 */

import {useConstants} from "/src/hooks/constants.js"
import {useUtils} from "/src/hooks/utils.js"

const constants = useConstants()
const utils = useUtils()

const WEB3FORMS_API_URL = "https://api.web3forms.com/submit"

export const useApi = () => {
    return {
        validators,
        handlers,
        analytics
    }
}

const validators = {
    /**
     * @param {String} name
     * @param {String} email
     * @param {String} subject
     * @param {String} message
     */
    validateEmailRequest: (name, email, subject, message) => {
        const minWordCountForMessage = 3

        const validations = [
            { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,      errorCondition: !name || !email || !subject || !message },
            { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,             errorCondition: !utils.validation.validateEmail(email) },
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,    errorCondition: !utils.validation.isLongerThan(message, minWordCountForMessage),    messageParameter: minWordCountForMessage + 1},
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,      errorCondition: utils.validation.isSpam(message) },
        ]

        const error = validations.find(validation => validation.errorCondition)
        return {
            success: !error,
            errorCode: error?.errorCode,
            errorParameter: error?.messageParameter,
            bundle: {
                name: name,
                from_name: name,
                email: email,
                from_email: email,
                custom_subject: subject,
                message: message,
                custom_source: utils.url.getAbsoluteLocation(),
                custom_source_name: "React Portfolio"
            }
        }
    }
}

const handlers = {
    /**
     * @return {Promise<{success: (*|boolean)}>}
     */
    dummyRequest: async () => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        window._dummyRequestSuccess = !window._dummyRequestSuccess

        return {
            success: window._dummyRequestSuccess
        }
    },

    /**
     * Sends contact form via Web3Forms API
     * @param {Object} validationBundle - { name, email, custom_subject, message, ... }
     * @param {String} accessKey - Web3Forms access key
     * @return {Promise<{success: boolean}>}
     */
    sendContactFormRequest: async (validationBundle, accessKey) => {
        const response = { success: false }

        if (!accessKey) {
            return response
        }

        try {
            const payload = {
                access_key: accessKey,
                name: validationBundle.name,
                email: validationBundle.email,
                subject: validationBundle.custom_subject,
                message: validationBundle.message,
                from_name: validationBundle.from_name,
                botcheck: "", // honeypot for spam protection
            }

            const res = await fetch(WEB3FORMS_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const data = await res.json().catch(() => ({}))
            response.success = res.ok && (data.success === true || data.success === "true")
        } catch {
            response.success = false
        }

        return response
    }
}

const analytics = {
    /**
     * @description This method can be used to report a visit to an external analytics service.
     * Here, you can integrate Google Analytics, Mixpanel, or your own custom analytics implementation.
     * @returns {Promise<void>}
     */
    reportVisit: async() => {
        await fetch("https://admin.ryanbalieiro.com/api/analytics/mock", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                params: {
                    url: utils.url.getRootLocation(),
                    template_id: "react-portfolio"
                }
            })
        })
    }
}