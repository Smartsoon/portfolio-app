import moment from 'moment';

export const formatDate = date => {
    return moment.unix(date / 1000).format('DD/MM/YYYY')
};

export const setDaysOfExperience = (startDate, endDate) => {
    let now = moment().unix();

    if (endDate) {
        now = endDate / 1000;
    }

    return moment.unix(now).diff(moment.unix(startDate / 1000), 'days')
};

export const fromNow = (date) => {
    return moment.unix(date / 1000).fromNow()
};

export const shortify = (text, maxLength) => {
    if (!text) {
        return ""
    }
    if (text.length <= maxLength) {
        return text
    }
    return text.substr(0, maxLength) + "...";
};
