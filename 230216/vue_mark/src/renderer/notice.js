/**
 * @description: renderer notice
 * @param {*} option
 * @return {*}
 */
const notification = (option) => {
    option = {
        title: option.title || "Notice",
        body: option.body,
        icon: "./mark@128.ico", // public/mark@128.ico
    };

    new window.Notification(option.title, option);
}


export default notification

