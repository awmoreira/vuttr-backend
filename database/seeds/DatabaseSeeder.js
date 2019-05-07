'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      username: 'Allan Winckler Moreira',
      email: 'awmoreira@gmail.com',
      password: '123456'
    })

    await user.tools().create({
      user_id: user.id,
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags:
        '["organization", "planning", "collaboration", "writing", "calendar"]'
    })
  }
}

module.exports = DatabaseSeeder
