import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

//share iteration
export const options = {
    scenarios: {
        shared_iter_scenario:{
            executor: 'shared-iterations',
            vus: 1000,
            iterations: 3500,
            maxDuration: '2000ms',
        },
    }
}

export default function (){
    group('Successfull create user with vus 1000', function (){
        const url = 'https://reqres.in/api/users';
        const payload = JSON.stringify ({
            name: 'Testing123',
            job: 'QA'
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
                'response code was 201' : (res) => res.status == 201
            });
        });

    group('Successfull update user with vus 1000', function (){
        const res = http.put('https://reqres.in/api/users/');
        const payload = JSON.stringify ({
            name: 'morpheus',
            job: 'zion resident'
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
                'response code was 200' : (res) => res.status ==200,
            });
        });
        sleep(1);
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}