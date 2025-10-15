import { Builder, By, Key, until } from "selenium-webdriver";

async function testSignup() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:5173/signup"); 

    await driver.wait(until.elementLocated(By.css("input[placeholder='John Doe']")), 5000);

    await driver.findElement(By.css("input[placeholder='John Doe']")).sendKeys("User 7");
    await driver.findElement(By.css("input[placeholder='you@example.com']")).sendKeys("User7@example.com222");
    await driver.findElement(By.css("input[type='password']")).sendKeys("test1123441443", Key.RETURN);

    const w = await driver.wait(until.urlContains("/"), 3000);
    if (w){
      console.log(" Signup Test Passed!");
      await driver.sleep(10000);
    }
  } catch (error) {
    console.error(" Signup Test Failed:", error);
  } finally {
    await driver.quit();
  }
}

testSignup();
