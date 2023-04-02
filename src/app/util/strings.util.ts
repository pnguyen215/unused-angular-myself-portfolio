export class Strings {

    static getFirstEachLetters(text: string, isUppercase: boolean): string {
        if (text == null || text == undefined || text == '') {
            return text;
        }
        const firstLetters = text
            .split(' ')
            .map(word => word[0])
            .join('');

        return isUppercase ? firstLetters.toUpperCase() : firstLetters;
    }

    static capitalizeFirstEachLetter(text: string): string {
        if (text == null || text == undefined || text == '') {
            return text;
        }
        return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }
}
