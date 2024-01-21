#### OGUN DIGITAL SUMMIT PLATFORM

___

[Postman Documentation](https://documenter.getpostman.com/view/25826735/2s9XxzvtL2)

___

#### Project setup

Follow the steps highlighted below to get the application running on your local computer

#### Prerequiste

    * Ensure you have `Node` with version >=14 installed.
    * You have a text editor (preferably Vscode) installed on your computer
    * MongoDB (if running locally)
    * Postman (to test the APIs)

___

## Steps

    1. Clone the repository into your computer. Run command `git clone https://https://github.com/Grazac-Project/odsBE.git`
    2. Open the project folder with your desire code editor
    3. Open a built in terminal
    4. Create a `.env` file in the root of the project and configure your environment variables (check .env.example file for details)
    5. To install all dependencies used in the project, run `npm i`
    6. To ensure the project is open with rules specific by eslint used in this project, type in `npm run lint` on the terminal
    7. Next, ensure the project files are rightly formatted by typing in `npm run format:check`
    8. In the .env file, insert your mongodb uri link.
    9. Finally, to start the development server, `npm run dev`

___

#### API Endpoints

##### Register Speaker & Panelist

> POST ⇒ {{url}}/user/signup
> **Example request body:**

```js
           {
      "email":"Olasco@gmail.com",
      "first_name":"Olamide",
      "last_name":"Benjamin",
      "gender":"Male",
      "mobile_number":"08173645342",
      "personal_web_url":"olamidebanjamin.com",
      "linkedin":"https://linkedin:olamidebenjamin",
      "role":"Speaker",
      "topic":"Impact of AI and web3 on the future of work",
      "work_sector":"FinTech",
      "other_work_sector":"Air transport worker",
      "comm_skills":"Fluent",
      "years_of_exp":"3-4 Years",
      "current_role":"Executive",
      "raised_capital":"True",
      "career_experience_url":"Olamidebenjamin.pdf",
      "stage_of_funding":"",
      "company_lead_exp":"",
      "company_impact_exp":"",
      "other_exp":"",
      "other_exp_details":"",
      "sig_comp_exp":""
      }
```

**Example response body**

```js

   {
    "message": "Registration completed",
    "Name": "Olamide Benjamin",
    "id": "64ff24359ec5e250d2c33bcc",
    "role": "Speaker"
}
```

##### Register Masterclass Trainer

> POST ⇒ {{url}}//user/masterclass
> **Example request body:**

```js
{
    "email":"Francissoludo@gmail.com",
      "first_name":"Francis",
      "last_name":"Soludo",
      "mobile_number":"08072994856",
      "gender":"Male",
      "role":"Masterclass Trainer",
      "personal_web_url":"Soludofrancisf.com",
      "linkedin":"https://linkedin/francissoludo",
      "masterclass_topic":"Getting started in tech - Knowing what to learn",
      "masterclass_topic_knowledge":"Really good at it",
      "masterclass_cv_url":"FrancisCV.pdf"
 }
 ```

 ```js
{
    "message": "Registration completed",
    "Name": "Francis Soludo",
    "id": "64ff2a559ec5e250d2c33bcf",
    "role": "Masterclass Trainer"
}

```


##### Register Exhibitor

> POST ⇒ {{url}}//user/Exhibitor
> **Example request body:**


```js
{
    "exhibitor_company_name":"Salazar enterprises",
      "email":"Salazar.nigeria@gmail.com",
      "mobile_number":"08045678976",
      "exhibition_size":"3m by 6m"
}

```
**Example response body**


```js
{
    "message": "Registration completed"
}

```
