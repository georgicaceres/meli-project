const crudService = require ('../services/crudService');
const fs = require('fs');
const assert = require('assert');

describe('crudService', function() {
    const initialUsers = [
        {id: 'vnsa334md', name: 'Pepe', surname: 'Perez', phone: '12345678', email: 'pepe@perez.com'},
        {id: '45faljhdrr4', name: 'Lola', surname: 'García', phone: '55555555', email: 'lola@domain.com'}
    ];
    beforeEach(function() {
        crudService.filePath =  __dirname + '/test_data.txt';
        fs.appendFileSync(crudService.filePath, initialUsers.map(user => JSON.stringify(user) + '\n').join(''), 'utf-8');

    });
    describe('#getUsers()', function() {
        it('should get all users', async function() {
            const users = await crudService.getUsers();
            assert.deepEqual(users, initialUsers, 'Users are not correctly loaded from the file');
        });
    });
    describe('#addUser()', function() {
        it('should add a user', async function() {
            const new_user = {id: 'fake123', name: 'new', surname: 'user', phone: '1111111', email: 'new_user@fake.com'};
            await crudService.addUser(new_user);
            const users = await crudService.getUsers();
            assert.deepEqual(users.find(u => u.id == new_user.id), new_user, 'Can not find new user in users');
            assert.equal(users.length, 3, 'Users should have three elements')
        });
    });
    describe('#saveUsers()', function() {
        it('should overwrite users file', async function() {
            const new_users = [
                {id: 'fake1', name: 'new1', surname: 'user1', phone: '1111111', email: 'new_user1@fake.com'},
                {id: 'fake2', name: 'new2', surname: 'user2', phone: '2222222', email: 'new_user22@fake.com'},
                {id: 'fake3', name: 'new3', surname: 'user3', phone: '33333333', email: 'new_user333@fake.com'}
            ];
            await crudService.saveUsers(new_users);
            const users = await crudService.getUsers();
            assert.deepEqual(users, new_users, 'The file data was not replaced with the new one');
            assert.equal(users.length, 3, 'Users should have three elements now')
        });
    });
    describe('#deleteUser()', function() {
        it('should delete a user', async function() {
            const id = 'vnsa334md';
            await crudService.deleteUser(id);
            const users = await crudService.getUsers();
            assert.equal(users.length, 1, 'Users should have one element now')
            assert.ok(!users.some(u => u.id == id), 'Users should not contain deleted user');
        });
    });
    describe('#editUser()', function() {
        it('should edit a user', async function() {
            const id = 'vnsa334md';
            const edited_user = {id: 'vnsa334md', name: 'Pedro', surname: 'Perez', phone: '9999999', email: 'pepe@perez.com'};
            await crudService.editUser(edited_user, id);
            const users = await crudService.getUsers();
            assert.equal(users.length, 2, 'Users should still have two elements')
            assert.deepEqual(users.find(u => u.id == id), edited_user, 'User data should be edited');
        });
    });
    afterEach(function() {
        fs.unlinkSync(crudService.filePath);
    });
});
