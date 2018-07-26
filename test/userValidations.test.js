const { emailRegex , validations } = require('../validations/userValidations');
const { validationResult } = require('express-validator/check');
const httpMocks = require('node-mocks-http');
const assert = require('assert');

const checkEmail = str => str.match(emailRegex);

const testExpressValidatorMiddleware = async params => {
    const res = httpMocks.createResponse();
    const req  = httpMocks.createRequest({method: 'POST', url: '/user', params});
    await Promise.all(validations.map(async (middleware) => {
        await middleware(req, res, () => undefined);
    }));
    return validationResult(req).array();
};

describe('userValidations', function() {
    describe('#validations', function() {
        it('should filter invalid names', async function() {
            let result = await testExpressValidatorMiddleware({name: 'adas asdas dadasdasdasdasdd adasdas'});
            assert.ok(result.some(r => r.param === 'name'), 'Name is too long');
            result = await testExpressValidatorMiddleware({name: ''});
            assert.ok(result.some(r => r.param === 'name'), 'Name is empty');
        });
        it('should allow valid names', async function() {
            let result = await testExpressValidatorMiddleware({name: 'dasdasdd adasdas'});
            assert.ok(!result.some(r => r.param === 'name'), 'Name is valid');
        });
        it('should filter invalid surnames', async function() {
            let result = await testExpressValidatorMiddleware({surname: 'adas asdas dadasdasdasdasdd adasdas'});
            assert.ok(result.some(r => r.param === 'surname'), 'Surname is too long');
            result = await testExpressValidatorMiddleware({surname: ''});
            assert.ok(result.some(r => r.param === 'surname'), 'Surname is empty');
        });
        it('should allow valid surnames', async function() {
            let result = await testExpressValidatorMiddleware({surname: 'dasdasdd adasdas'});
            assert.ok(!result.some(r => r.param === 'surname'), 'Surname is valid');
        });
        it('should filter invalid phones', async function() {
            let result = await testExpressValidatorMiddleware({phone: 'ss4f5svv'});
            assert.ok(result.some(r => r.param === 'phone'), 'Phone must be only numbers');
        });
        it('should allow empty phones', async function() {
            let result = await testExpressValidatorMiddleware({phone: ''});
            assert.ok(!result.some(r => r.param === 'phone'), 'Phone can be empty');
        });
        it('should allow numeric phones', async function() {
            let result = await testExpressValidatorMiddleware({phone: '56896432'});
            assert.ok(!result.some(r => r.param === 'phone'), 'Phone can be only numbers');
        });
        it('should filter invalid emails', async function() {
            let result = await testExpressValidatorMiddleware({email: 'plainaddress'});
            assert.ok(result.some(r => r.param === 'email'), 'plainaddres should be invalid');
            result = await testExpressValidatorMiddleware({email: '#@%^%#$@#$@#.com'});
            assert.ok(result.some(r => r.param === 'email'), '#@%^%#$@#$@#.com should be invalid');
            result = await testExpressValidatorMiddleware({email: 'Joe Smith <email@domain.com>'});
            assert.ok(result.some(r => r.param === 'email'), 'Encoded html should be invalid');
            result = await testExpressValidatorMiddleware({email: 'email@domain@domain.com'});
            assert.ok(result.some(r => r.param === 'email'), 'Two @ sing should be invalid');
            result = await testExpressValidatorMiddleware({email: 'email@domain'});
            assert.ok(result.some(r => r.param === 'email'), 'Missing top level domain should be invalid');
        });
        it('should allow valid emails', async function() {
            let result = await testExpressValidatorMiddleware({email: 'email@subdodmain.domain.com'});
            assert.ok(!result.some(r => r.param === 'email'), 'Subdomains should be allowed');
            result = await testExpressValidatorMiddleware({email: '_______@domain.com'});
            assert.ok(!result.some(r => r.param === 'email'), 'Underscore should be allowed');
            result = await testExpressValidatorMiddleware({email: 'email@domain-one.com'});
            assert.ok(!result.some(r => r.param === 'email'), 'Dash should be allowed');
            result = await testExpressValidatorMiddleware({email: '1231235@domain.com'});
            assert.ok(!result.some(r => r.param === 'email'), 'Numbers should be allowed');
        });
    });
    describe('#emailRegex', function() {
        it('should return true for valid emails', function() {
            assert.ok(checkEmail('email@domain.com'));
            assert.ok(checkEmail('firstname.lastname@domain.com'));
            assert.ok(checkEmail('email@subdomain.domain.com'), 'Subdomains are allowed');
            assert.ok(checkEmail('_______@domain.com'), 'Underscore is allowed');
            assert.ok(checkEmail('email@domain-one.com'), 'Dash is allowed');
            assert.ok(checkEmail('1234567890@domain.com'), 'Numbers are allowed');
        });
        it('should return false for invalid emails', function() {
            assert.ok(!checkEmail('plainaddress'), 'Missing @ sign and domain');
            assert.ok(!checkEmail('#@%^%#$@#$@#.com'), 'Garbage');
            assert.ok(!checkEmail('@domain.com'), 'Missing username');
            assert.ok(!checkEmail('Joe Smith <email@domain.com>'), 'Encoded html within email is invalid');
            assert.ok(!checkEmail('email.domain.com'), 'Missing @');
            assert.ok(!checkEmail('email@domain@domain.com'), ' Two @ sign');
            assert.ok(!checkEmail('email.@domain.com'), 'Trailing dot in address is not allowed');
            assert.ok(!checkEmail('あいうえお@domain.com'), 'Unicode char as address');
            assert.ok(!checkEmail('email@domain.com (Joe Smith)'), 'Text followed email is not allowed');
            assert.ok(!checkEmail('email@domain'), 'Missing top level domain (.com/.net/.org/etc)');
            assert.ok(!checkEmail('email@-domain.com'), 'Leading dash in front of domain is invalid');
            assert.ok(!checkEmail('.email@domain.com'), 'Leading dot in address is not allowed');
        });
    });
});
