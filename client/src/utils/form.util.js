const { capitalize } = require('./general.util');

const labelize = (field) => {
    const formatted = field.replace(/_/g, ' ');
    return capitalize(formatted);
}

module.exports = { labelize }