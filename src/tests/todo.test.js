const puppeteer = require('puppeteer');

describe('e2e testing', () => {
    let browser = null;
    let page = null;

    beforeAll(async () => {
        const browserURL = 'http://localhost:5001/';
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto(browserURL);
    });

    afterAll(async () => {
        await page.waitForTimeout(2000);
        await browser.close();
    })

    test('should fetch all tasks', async () => {
        expect(await page.$$('.execute')).toHaveLength(5);
    })

    test('should create task', async () => {
        await page.waitForSelector('.texterea');
        await page.$eval('.texterea', el => el.value = `test new task 1`);
        await page.click('.texterea', {delay: 2000});
        await page.click('.message-add', {delay: 2000});

        const elements = await page.evaluate(() => Array.from(document.querySelectorAll('.tasks__item'), element => element.textContent));
        const newElement = elements.filter((element) => element === 'test new task 1');
        expect(newElement).toBeTruthy();
    })

    // test('should edit task', async () => {
    //     await page.waitForTimeout(2000);
    //     await page.waitForSelector('.execute');

    //     const status = await page.$$('.execute');
    //     const taskslenght = (await page.$$('.execute')).length;

    //     await status[1].click();
    //     await page.waitForTimeout(2000);
    //     expect().toBe();
    // })


    // test('should delete task', async () => {
    //     await page.waitForSelector('.btn-delete');

    //     const trash = await page.$$('.btn-delete');
    //     const taskslenght = (await page.$$('.btn-delete')).length;

    //     await page.waitForTimeout(2000);
    //     await trash[2].click();

    //     const modal = await page.waitForSelector('.btn-delete-yes', { visiable: true });
    //     await modal.click();

    //     const elements = await page.evaluate(() => Array.from(document.querySelectorAll('.tasks__item'), element => element.textContent));
    //     const newElement = elements.filter((element) => element === 'seed 3');

    //     expect(newElement).toBe('seed 3');
    // })
})



