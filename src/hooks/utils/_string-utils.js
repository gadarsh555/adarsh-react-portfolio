/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _stringUtils = {
    /**
     * @param {String} name
     * @return {String}
     */
    abbreviateName: (name) => {
        const exceptions = [
            'de', 'da', 'das', 'do', 'dos', 'di', 'del', 'della', 'dallo', 'dalla', 'dei', 'degli', 'y', 'e',
            'du', 'des', 'le', 'la', 'les',
            'von', 'van', 'zu', 'zum', 'zur', 'ten', 'ter', 'te', 'der', 'den', 'op', 'af', 'av',
            'of', 'the', 'and',
            'al', 'bin', 'ibn', 'bint', 'abu', 'umm', 'abd',
            'z', 'ze', 'za', 'pod', 'nad', 'u', 'od', 'do', 'na',
            'ben', 'bat', 'bar',
            'mir', 'khwaja', 'zada'
        ]

        return name.split(' ')
            .map((word, index, arr) => {
                if (index === 0 || index === arr.length - 1 || exceptions.includes(word.toLowerCase())) {
                    return word
                }
                return word[0].toUpperCase() + '.'
            })
            .join(' ')
    },

    /**
     * @param {string} string
     * @return {string}
     */
    extractFirstPart: (string) => {
        if (!string)
            return string

        string = _stringUtils.stripHTMLTags(string)

        const separators = [':', '-', '–']
        let firstIndex = -1

        for (const sep of separators) {
            const index = string.indexOf(sep)
            if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
                firstIndex = index
            }
        }

        return firstIndex !== -1 ?
            string.substring(0, firstIndex).trim() :
            string
    },

    /**
     * @param {string} string
     * @return {string}
     */
    extractFirstPeriod: (string) => {
        if(!string)
            return string

        const match = String(string).match(/.*?\./)
        return match ? match[0].trim() : string.trim()
    },

    /**
     * @param {String} [prefix]
     * @return {string}
     */
    generateUniqueRandomString: (prefix) => {
        prefix = prefix || 'key'
        window.randStrGenCount = window.randStrGenCount || 0
        window.randStrGenCount++
        return prefix + "-rand-" + window.randStrGenCount
    },

    /**
     * @param {Boolean} condition
     * @param {String} string
     */
    if: (condition, string) => {
        if(condition) return string
        return ""
    },

    /**
     * @param {String} string
     * @param {Number} maxChars
     * @return {string|*}
     */
    limitTextSize: (string, maxChars) => {
        if(!string)
            return null

        if(string.length <= maxChars) {
            return string
        }

        return string.substring(0, maxChars - 5) + "(...)"
    },

    /**
     * @param {String} string
     * @param {Number} maxChars
     * @return {string|*}
     */
    limitTextSizeWithoutCroppingWords: (string, maxChars) => {
        if(!string)
            return null

        if (string.length <= maxChars) {
            return string
        }

        const trimmed = string.substring(0, maxChars)
        const lastSpaceIndex = trimmed.lastIndexOf(' ')
        if (lastSpaceIndex === -1) {
            return trimmed + "(...)"
        }

        return trimmed.substring(0, lastSpaceIndex) + "(...)"
    },

    /**
     * @param {string} string
     * @return {string}
     */
    stripHTMLTags: (string) => {
        if(!string)
            return ""

        return String(string).replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/gi, ' ')
            .replace(/&quot;/gi, '"')
            .replace(/&#39;/gi, "'")
            .replace(/&amp;/gi, '&')
    },

    /**
     * @param {Number} percentage
     */
    toDisplayPercentage: (percentage) => {
        if(percentage === null || percentage === undefined || isNaN(percentage))
            return null
        return percentage + "%"
    },

    /**
     * Wraps CGPA and percentage values in highlight spans for visual emphasis.
     * @param {string} string
     * @return {string}
     */
    highlightMetrics: (string) => {
        if (!string || typeof string !== "string") return string
        return String(string)
            .replace(/(\d+\.?\d*%)/g, '<span class="highlight-metric">$1</span>')
            .replace(/(\d+\.?\d*\s*CGPA|CGPA:\s*\d+\.?\d*)/gi, '<span class="highlight-metric">$1</span>')
    },

    /**
     * Wraps important achievement terms (numbers, scores, company/platform names) in highlight spans.
     * Use for Achievements section descriptions.
     * @param {string} string - Already processed by highlightMetrics
     * @return {string}
     */
    highlightAchievementTerms: (string) => {
        if (!string || typeof string !== "string") return string
        let s = String(string)
        // Numbers with + (e.g., 700+)
        s = s.replace(/(\d+\+)/g, '<span class="highlight-metric">$1</span>')
        // Scores in parens (e.g., (1407), (1628))
        s = s.replace(/(\(\d+\))/g, '<span class="highlight-metric">$1</span>')
        // X-Star patterns (e.g., 5-Star Badge, 3*)
        s = s.replace(/(\d+[- ]?[Ss]tar\s+[Bb]adge?)/g, '<span class="highlight-metric">$1</span>')
        s = s.replace(/(\d+[*★])/g, '<span class="highlight-metric">$1</span>')
        // Company/platform names (word boundaries to avoid partial matches)
        const terms = [
            'SaaS Labs', 'Amazon', 'Tekion', 'Infosys',
            'GeeksforGeeks', 'HackerEarth', 'CodeForces', 'CodeChef', 'HackerRank',
            'NIT Jamshedpur', 'Smart India Hackathon', 'Swastik', 'JEE Main', 'JEE Advanced'
        ]
        terms.forEach(term => {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const re = new RegExp(`\\b(${escaped})\\b`, 'g')
            s = s.replace(re, '<span class="highlight-metric">$1</span>')
        })
        return s
    },

    /** Shared tech/context terms for portfolio and experience highlighting */
    _techTerms: [
        'React', 'ReactJs', 'ReactJS', 'React Native', 'Node.js', 'NodeJs', 'NodeJS',
        'MongoDB', 'SocketIO', 'Express', 'Express.js', 'SQL', 'Firebase', 'Java',
        'REST API', 'RESTful API', 'RESTful', 'Android', 'Procore', 'Documents Management',
        'construction', 'CRL'
    ],

    /**
     * Portfolio: black-bold highlights. Use for My Portfolio section.
     * @param {string} string
     * @return {string}
     */
    highlightPortfolioTerms: (string) => {
        if (!string || typeof string !== "string") return string
        let s = _stringUtils.highlightMetrics(string)
        _stringUtils._techTerms.forEach(term => {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const re = new RegExp(`\\b(${escaped})\\b`, 'gi')
            s = s.replace(re, '<span class="highlight-portfolio">$1</span>')
        })
        return s
    },

    /**
     * Work Experience: bold-only highlights. Use for Work Experience section.
     * @param {string} string
     * @return {string}
     */
    highlightExperienceTerms: (string) => {
        if (!string || typeof string !== "string") return string
        let s = _stringUtils.highlightMetrics(string)
        _stringUtils._techTerms.forEach(term => {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const re = new RegExp(`\\b(${escaped})\\b`, 'gi')
            s = s.replace(re, '<span class="highlight-experience">$1</span>')
        })
        return s
    }
}