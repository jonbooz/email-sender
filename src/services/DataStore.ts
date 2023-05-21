
import * as AwsUtils from 'aws-utils';
import { User } from '../models/User';
import { Module } from '../models/Module';

const STACK_NAME = 'email-sender';
const USERS_TABLE = 'usersTable';
const MODULES_TABLE = 'modulesTable';

export class DataStore {
    private readonly aws: AwsUtils;

    constructor(aws: AwsUtils) {
        this.aws = aws;
    }

    async getUser(userName: string): Promise<User> {
        const resources = await this.aws.listStackResources(STACK_NAME);

        const readParams = {
            name: userName
        };
        return await this.aws.ddb.read(resources[USERS_TABLE], readParams)
            .then(data => new User(data));
    }

    async getActiveUsers(): Promise<Array<string>> {
        let resources = await this.aws.listStackResources(STACK_NAME);
        return await this.aws.ddb.scanAll(resources[USERS_TABLE])
            .then(data => data.map(d => d['name']));
    }

    async saveUser(user: User) {
        let resources = await this.aws.listStackResources(STACK_NAME);
        await this.aws.ddb.save(resources[USERS_TABLE], user.getDataForSaving());
    }

    async getModule(id: string): Promise<Module> {
        let resources = await this.aws.listStackResources(STACK_NAME);

        const readParams = {
            id: id
        };
        return await this.aws.ddb.read(resources[MODULES_TABLE], readParams)
            .then(data => new Module(data));
    }

    async getModules(userName: string): Promise<Array<Module>> {
        let resources = await this.aws.listStackResources(STACK_NAME);

        const filterExpression = "begins_with(#n, :v1)";
        const filterValues = { ':v1': userName };
        const filterNames = { '#n': 'id' };
        return await this.aws.ddb.scan(resources[MODULES_TABLE],
            filterExpression,
            filterValues,
            filterNames)
            .then(data => data.map((d) => new Module(d)));
    }

    async saveModule(module: Module) {
        let resources = await this.aws.listStackResources(STACK_NAME);
        await this.aws.ddb.save(resources[MODULES_TABLE], module);
    }
}
