'use strict'

const Tool = use('App/Models/Tool')

/**
 * Resourceful controller for interacting with tools
 */
class ToolController {
  /**
   * Show a list of all tools.
   * GET tools
   */
  async index ({ request }) {
    const { tag } = request.get()

    if (tag) {
      const tools = await Tool.query()
        .where('title', 'ilike', '%' + tag + '%')
        .orWhere('description', 'ilike', '%' + tag + '%')
        .orWhere('tags', 'ilike', '%' + tag + '%')
        .fetch()

      return tools
    }

    const tools = await Tool.query().fetch()
    return tools
  }

  /**
   * Create/save a new tool.
   * POST tools
   */
  async store ({ request, auth }) {
    const data = request.only(['title', 'link', 'description'])
    const tags = request.input('tags')

    const tool = Tool.create({
      user_id: auth.user.id,
      ...data,
      tags
    })

    return tool
  }

  /**
   * Display a single tool.
   * GET tools/:id
   */
  async show ({ params }) {
    const tool = await Tool.findOrFail(params.id)

    await tool.load('user')

    return tool
  }

  /**
   * Update tool details.
   * PUT or PATCH tools/:id
   */
  async update ({ request, response, params, auth }) {
    const tool = await Tool.findOrFail(params.id)
    const data = request.only(['title', 'link', 'description'])
    const tags = JSON.stringify(request.input('tags'))

    data.tags = tags

    if (tool.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: { message: 'Only the creator user can update.' } })
    }

    tool.merge(data)

    await tool.save()

    return tool
  }

  /**
   * Delete a tool with id.
   * DELETE tools/:id
   */
  async destroy ({ params }) {
    const tool = await Tool.findOrFail(params.id)

    await tool.delete()
  }
}

module.exports = ToolController
