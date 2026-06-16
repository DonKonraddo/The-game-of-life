import { chromium } from 'playwright'

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage()
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForSelector('h1')

await page.screenshot({ path: '/tmp/screenshot-setup.png' })

// click a cell at row5,col5 area: select first 30 buttons (1st row), click a few
const buttons = await page.$$('div[style*="grid-template-columns"] button')
console.log('cell buttons found:', buttons.length)
await buttons[31].click() // row1,col1 roughly
await buttons[63].click()
await buttons[95].click()

await page.screenshot({ path: '/tmp/screenshot-cells-clicked.png' })

// click "Rozpocznij grę"
await page.getByRole('button', { name: 'Rozpocznij grę' }).click()
await page.screenshot({ path: '/tmp/screenshot-right-after-start-click.png' })
await page.waitForSelector('text=Generacja:')

await page.screenshot({ path: '/tmp/screenshot-simulating.png' })

// step once
await page.getByRole('button', { name: 'Krok' }).click()
await page.waitForSelector('text=Generacja: 1')

// start play, wait a moment, pause
await page.getByRole('button', { name: 'Start' }).click()
await page.waitForTimeout(1200)
await page.getByRole('button', { name: 'Pauza' }).click()

await page.screenshot({ path: '/tmp/screenshot-after-play.png' })

console.log('console errors:', JSON.stringify(errors))

await browser.close()
