import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";

// Import from utils
import { loginData, employeeData } from "../utils/testData";
import { generateEmpId } from "../utils/helpers";

test('HRM Add Employee (POM + Utils)', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const employeePage = new EmployeePage(page);

    const empId = generateEmpId(); // dynamic from helper

    // Login
    await loginPage.goto();
    await loginPage.login(loginData.username, loginData.password);

    await expect(page).toHaveURL(/dashboard\/index/);

    // Add Employee
    await employeePage.goToPIM();
    await employeePage.clickAddEmployee();

    await employeePage.addEmployee(
        employeeData.firstName,
        employeeData.middleName,
        employeeData.lastName
    );

    // Go to Employee List
    await employeePage.goToEmployeeList();

    // Search by first name (or leave blank to show all)
    await employeePage.searchEmployee(employeeData.firstName);

    // Print all employee records in console
    const rows = await employeePage.employeeTableRows.all();
    console.log('--- Employee Records ---');
    for (const row of rows) {
        const cells = await row.locator('div.oxd-table-cell').allTextContents();
        console.log(cells.map(c => c.trim()).join(' | '));
    }
});

