const puppeteer = require('puppeteer');

describe('e2e testing', () => {
    let browser = null;
    let page = null;

    beforeAll(async () => {
        const browserURL = 'http://localhost:5001/';
        browser = await puppeteer.launch({
            headless: false,
        });
        page = await browser.newPage();
        await page.goto(browserURL);
    });

    afterAll(async function () {
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('should fetch all tasks', async function () {
        await page.waitForSelector('.tasks__item');
        expect(await page.$$('.tasks__item')).toHaveLength(5);
    });

    test('should create task', async function () {
        await page.waitForSelector('.texterea');
        await page.$eval('.texterea', (el) => (el.value = 'new task'));
        await page.waitForTimeout(1000);
        await page.click('.texterea');
        await page.waitForTimeout(1000);
        await page.click('.message-add');
        await page.waitForTimeout(1000);
        const element = await page.evaluate(() =>
            Array.from(
                document.querySelectorAll('.tasks__item'),
                (element) => element.textContent === 'new task',
            ),
        );
        expect(element).toBeTruthy();
    });

    test('should edit task', async function () {
        await page.waitForTimeout(1000);
        await page.waitForSelector('.execute');

        const status = await page.$$('.execute');
        await page.waitForTimeout(1000);
        await status[1].click();
        await page.waitForTimeout(1000);
        expect(await page.$$('.check-true')).toHaveLength(1);
    });

    test('should delete task', async function () {
        await page.waitForSelector('.btn-delete');
        const trash = await page.$$('.btn-delete');
        await page.waitForTimeout(1000);
        await trash[4].click();
        await page.waitForTimeout(1000);
        const modal = await page.waitForSelector('.btn-delete-yes', {
            visiable: true,
        });
        await modal.click();
        await page.waitForTimeout(1000);
        const element = await page.evaluate(() =>
            Array.from(
                document.querySelectorAll('.tasks__item'),
                (element) => element.textContent === 'new task',
            ),
        );
        await page.waitForTimeout(1000);
        expect(element).toEqual(
            expect.arrayContaining([false, false, false, false, false]),
        );
    });
});
