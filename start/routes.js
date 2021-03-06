'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('sessions', 'SessionController.store')
Route.post('users', 'UserController.store')

Route.resource('tools', 'ToolController')
  .apiOnly()
  .middleware('auth')
