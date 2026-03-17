export class EmployeePage {
    constructor(page) {
        this.page = page;

        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeBtn = page.getByRole('link', { name: 'Add Employee' });

        this.employeeListBtn = page.locator('a', { hasText: 'Employee List' });

        this.firstName = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');

        this.empIdInput = page.locator(
            'div.oxd-input-group:has(div.oxd-input-group__label-wrapper:has-text("Employee Id")) input'
        );

        this.saveBtn = page.locator('button[type="submit"]');

        // Employee list search fields
        this.searchNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.employeeTableRows = page.locator('div.oxd-table-body > div.oxd-table-card'); // all rows
    }

    async goToPIM() {
        await this.pimMenu.click();
    }

    async clickAddEmployee() {
        await this.addEmployeeBtn.click();
    }

    // add employee
    async addEmployee(first, middle, last, empId) {
        await this.firstName.fill(first);
        await this.middleName.fill(middle);
        await this.lastName.fill(last);
        

        await this.saveBtn.click();
    }

    async goToEmployeeList() {
        await this.pimMenu.click();
        await this.employeeListBtn.click();
        // wait for employee list table to load
        await this.employeeTableRows.first().waitFor({ state: 'visible', timeout: 5000 });
    }

    // Search for employee by name in Employee List
    async searchEmployee(employeeName) {
        await this.searchNameInput.fill(employeeName); // type employee name here
        
        await this.searchBtn.click();
        // wait for search results
        await this.employeeTableRows.first().waitFor({ state: 'visible', timeout: 5000 });
    }

}