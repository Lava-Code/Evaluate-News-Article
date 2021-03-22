import { checkUrl } from '../js/checkURL'

describe('Test the checkUrl Function Existing', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(checkUrl).toBeDefined();
    })

    test('Testing the checkUrl function to validate invalid URL', () => {
        expect(checkUrl('google')).toBeFalsy();
    })

    test('Testing the checkUrl function to validate valid URL', () => {
        expect(checkUrl('https://translate.google.com/')).toBeTruthy();
    })
})
