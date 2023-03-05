import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { check, group } from 'k6';

export default function (){
    group('Succesfull create User', function(){
        const url = 'https://reqres.in/api/users'
        const payload = JSON.stringify ({
            name: 'morpheus',
            job: 'leader'
        });

        const params = {
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const res = http.post(url, payload, params);
        check(
            res,
            {
                'response code was 201' : (res) => res.status == 201,
            });
    });

    group('Successfull Register', function() {
        const url = 'https://reqres.in/api/register';
        const payload = JSON.stringify ({
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        });
    
        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = http.post(url, payload, params);
        check(
            res,
            {
                'response code was 200' : (res) => res.status == 200,
            });
    });

    group('Unsuccessfull Register', function (){
        const url = 'https://reqres.in/api/register';
        const payload = JSON.stringify ({
            email: 'test@gmail.com',
            password: ''
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = http.post(url, payload, params);
        check(
            res,
            {
                'response code was 400' : (res) => res.status == 400,
            });
    });

    group('Login Successfull', function (){
        const url = 'https://reqres.in/api/login';
        const payload = JSON.stringify ({
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = http.post(url, payload, params);
        check(
            res,
            {
                'response code was 200' : (res) => res.status == 200,
            });
    });

    group('Login Unsuccessfull', function (){
        const url = 'https://reqres.in/api/login';
        const payload = JSON.stringify ({
            email: 'test@gmail.com'
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = http.post(url, payload, params);
        check(
            res,
            {
                'response code was 400' : (res) => res.status == 400,
            });
    });
    group('Sucessfull Edit Profile User', function (){
        const res = http.put('https://reqres.in/api/users/2');
        const payload = JSON.stringify ({
            name: 'testing123',
            job: 'QA'
        });
        const params = {
            headers: {
                'Content-Type' : 'application/json',
        },
    };
        const checkOutput = 
        check(
            res,
            {
                'response code was 200' : (res) => res.status == 200,
            });
    });
} 

