import { faker } from "@faker-js/faker";

const statuses = ["completed", "active", "terminated", "draft"];

const generateContract = () => {
    return {
        contract_id: faker.string.uuid(),
        client_name: faker.person.fullName(),
        status: faker.helpers.arrayElement(statuses),
        start_date: faker.date.past(2).toISOString().split("T")[0],
        end_date: faker.date.future(1).toISOString().split("T")[0],
        contract_value: faker.number
            .bigInt({ min: 1000n, max: 100000n })
            .toString(),
    };
};

// Example of generating 5 contracts
const contracts = Array.from({ length: 50 }, generateContract);

console.log(contracts);
