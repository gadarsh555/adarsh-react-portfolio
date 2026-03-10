# <img src="../assets/logo.png"> Tutorial 19 – ArticleContactForm

## Preview

![alt preview](../assets/article-contact-form-preview.png)

The `ArticleContactForm` component is used for displaying a contact form that allows users to send messages or inquiries directly from the website. Unlike other articles, this one does not require any items to be defined. Instead, it relies on settings for configuration.

## Web3Forms Integration

The contact form component integrates [Web3Forms](https://web3forms.com/), a free contact form API that delivers submissions to your email inbox without requiring a backend.

To configure Web3Forms, follow these steps:

1. Go to [app.web3forms.com](https://app.web3forms.com/)
2. Verify your email address
3. Create a form and copy your **Access Key**
4. Add the access key to your contact section settings (see below)

Web3Forms will send form submissions (name, email, subject, message) directly to the email address you registered with. No templates or additional setup required.

## Basic Working Example

Copy and paste this into a section's `articles` array and replace `YOUR_WEB3FORMS_ACCESS_KEY` with your Web3Forms access key:

```json
{
    "id": 1,
    "component": "ArticleContactForm",
    "settings": {
        "web3forms_access_key": "YOUR_WEB3FORMS_ACCESS_KEY"
    },
    "locales": {
        "en": {
            "contact_thank_you_title": "{{Thanks}} for the contact!",
            "contact_thank_you_body": "Your message has been received, and I'll be reaching out to you soon. I appreciate your time and look forward to connecting with you!",
            "contact_thank_you_footer": "The reply will be sent to your email address: {{$email}}",
            "title": "Send me a {{message}}"
        }
    },
    "items": null
}
```

### Required Settings

| Property                 | Type    | Description                                                              |
|--------------------------|---------|--------------------------------------------------------------------------|
| `web3forms_access_key`   | STRING  | Your Web3Forms access key from [app.web3forms.com](https://app.web3forms.com/). |

### Required Locales

| Property                        | Type    | Description                                                                                                |
|---------------------------------|---------|------------------------------------------------------------------------------------------------------------|
| `contact_thank_you_title`       | STRING  | The title displayed after the form is successfully submitted.                                              |
| `contact_thank_you_body`        | STRING  | The body text displayed after the form is successfully submitted.                                          |
| `contact_thank_you_footer`      | STRING  | The footer text displayed after the form is successfully submitted, which includes the parameter `$email`. |
| `title`                         | STRING  | The title of the contact form.                                                                             |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** All fields are required and must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleThreads](./TUTORIAL_18_ARTICLE_THREADS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Categorizing Article Items](./TUTORIAL_20_CATEGORIZING_ARTICLE_ITEMS.md) ➡️ 
