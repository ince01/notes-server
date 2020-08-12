/**
 * @api {post} /user/signUp 01 - Sign up
 * @apiName SingUp
 * @apiGroup User
 *
 * @apiParam {Email} email User unique email for sign up.
 * @apiParam {String} password Password for sign in with app.
 * @apiParam {String} fullName User full name.
 * @apiParam {String} [gender] User gender (Male, Female or Other).
 * @apiParam {Date} [dateOfBirth] User birthday.
 * @apiParam {URL} [avatar] Avatar url.
 *
 * @apiSuccess {Object} data Data of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": {
 *             "emailVerified": false,
 *             "status": "INACTIVE",
 *             "_id": "5e3e5d012837ee4a916ad07c",
 *             "email": "toanln1@cyfeer.com",
 *             "password": "$2b$10$VcwvkRNkJez390O/rO0RL.PINg6Apnx/VCOR9xTqMv.Ozub2tJ5F2",
 *             "fullName": "Ince",
 *            "createdAt": "2020-02-08T07:02:25.563Z",
 *             "updatedAt": "2020-02-08T07:02:25.563Z",
 *            "__v": 0
 *        },
 *         "message": "Sign up successfully"
 *      }
 */

/**
 * @api {post} /user/signIn 02 - Sign in
 * @apiName SignIn
 * @apiGroup User
 *
 * @apiParam  {Email} email User's email registered.
 * @apiParam  {String} password Password.
 *
 * @apiSuccess (Success 200) {Object} data User's info with auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *           "emailVerified": false,
 *           "status": "INACTIVE",
 *           "_id": "5e3e5d012837ee4a916ad07c",
 *           "email": "toanln1@cyfeer.com",
 *           "password": "$2b$10$VcwvkRNkJez390O/rO0RL.PINg6Apnx/VCOR9xTqMv.Ozub2tJ5F2",
 *           "fullName": "Ince",
 *           "createdAt": "2020-02-08T07:02:25.563Z",
 *           "updatedAt": "2020-02-08T07:02:25.563Z",
 *           "__v": 0,
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM2U1ZDAxMjgzN2VlNGE5MTZhZDA3YyIsImlhdCI6MTU4MTE0NzEwOX0.SU9KhW2rJZYdWWUFRRgV_J9PcuTvzLBuLAjyRBLudVk"
 *       },
 *       "message": "Sign in successfully"
 *     }
 *
 */

/**
 * @api {get} /user/me 03 - Get Current User By Token
 * @apiName GetCurrentUserByToken
 * @apiGroup User
 *
 * @apiHeader {String} Authorization JWT token with auth prefix.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM2U1ZDAxMjgzN2VlNGE5MTZhZDA3YyIsImlhdCI6MTU4MTE0NzEwOX0.SU9KhW2rJZYdWWUFRRgV_J9PcuTvzLBuLAjyRBLudVk"
 *     }
 *
 * @apiSuccess (Success 200) {Object} data User's info with auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *           "emailVerified": false,
 *           "status": "INACTIVE",
 *           "_id": "5e3e5d012837ee4a916ad07c",
 *           "email": "toanln1@cyfeer.com",
 *           "password": "$2b$10$VcwvkRNkJez390O/rO0RL.PINg6Apnx/VCOR9xTqMv.Ozub2tJ5F2",
 *           "fullName": "Ince",
 *           "createdAt": "2020-02-08T07:02:25.563Z",
 *           "updatedAt": "2020-02-08T07:02:25.563Z",
 *           "__v": 0,
 *       },
 *       "message": "Success"
 *     }
 *
 */
