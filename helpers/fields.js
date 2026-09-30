const parseList = (value = '') =>
    String(value)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const unique = (items) => [...new Set(items)];

const parseLabels = (value = '') => {
    const raw = String(value).trim();
    if (!raw) {
        return {};
    }

    if (raw.startsWith('{')) {
        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
            console.error('Invalid FIELD_LABELS JSON:', error.message);
            return {};
        }
    }

    return raw.split(',').reduce((labels, part) => {
        const separatorIndex = part.indexOf(':');
        if (separatorIndex === -1) {
            return labels;
        }

        const key = part.slice(0, separatorIndex).trim();
        const label = part.slice(separatorIndex + 1).trim();
        if (key) {
            labels[key] = label;
        }
        return labels;
    }, {});
};

const getRequiredFields = () => {
    const required = parseList(process.env.REQUIRED_FIELDS);
    return required.length ? required : ['message'];
};

const getConfiguredAllowedFields = () => parseList(process.env.ALLOWED_FIELDS);

const getAllowedFields = (body = {}) => {
    const required = getRequiredFields();
    const configured = getConfiguredAllowedFields();

    if (configured.length) {
        return unique([...configured, ...required]);
    }

    return unique([...Object.keys(body), ...required]);
};

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const formatValue = (value) => {
    if (value === undefined || value === null) {
        return '';
    }

    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }

    return String(value);
};

const hasContent = (value) => formatValue(value).trim() !== '';

const buildEmailHtml = (body = {}) => {
    const labels = parseLabels(process.env.FIELD_LABELS);
    const fields = getAllowedFields(body);

    const rows = fields
        .filter((field) => hasContent(body[field]))
        .map((field) => {
            const label = labels[field] || field;
            const value = escapeHtml(formatValue(body[field])).replace(/\r\n|\n|\r/g, '<br>');
            return `<p><strong>${escapeHtml(label)}:</strong><br>${value}</p>`;
        });

    return rows.join('\n') || '<p>(sin contenido)</p>';
};

module.exports = {
    getRequiredFields,
    getAllowedFields,
    getConfiguredAllowedFields,
    parseLabels,
    buildEmailHtml,
};
