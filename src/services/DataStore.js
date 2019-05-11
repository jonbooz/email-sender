'use strict';

const AwsUtils = require('aws-utils');
const User = require('../models/User.js');
const Module = require('../models/Module.js');

const STACK_NAME = 'email-sender';

module.exports = class DataStore {
    /**
     * 
     * @param {AwsUtils} aws 
     */
    constructor(aws) {
        this.aws = aws;
    }

    async getUser(userName) {
        let resources = await this.aws.listStackResources(STACK_NAME);

        const readParams = {
            name: userName
        };
        return await this.aws.ddb.read(resources.usersTable, readParams)
            .then(data => new User(data));
    }

    /**
     * 
     * @param {User} user 
     */
    async saveUser(user) {
        let resources = await this.aws.listStackResources(STACK_NAME);

        await this.aws.ddb.save(resources.usersTable, user.asJson());
    }

    async getModule(id) {
        let resources = await this.aws.listStackResources(STACK_NAME);

        const readParams = {
            id: id
        };
        return await this.aws.ddb.read(resources.modulesTable, readParams)
            .then(data => new Module(data));
    }


    async getModules(userName) {
        let resources = await this.aws.listStackResources(STACK_NAME);

        const filterExpression = "begins_with(#n, :v1)";
        const filterValues = { ':v1': userName };
        const filterNames = { '#n': 'id' } 
        return await this.aws.ddb.scan(resources.modulesTable,
                    filterExpression,
                    filterValues,
                    filterNames)
                .then(data => data.map((d) => new Module(d)));
    }

    /**
     * 
     * @param {Module} module 
     */
    async saveModule(module) {
        let resources = await this.aws.listStackResources(STACK_NAME);

        await this.aws.ddb.save(resources.modulesTable, module.asJson());
    }

}