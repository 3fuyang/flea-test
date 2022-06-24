/// <reference types="cypress">
describe('E2E test for flea-test application', () => {
  before(() => {
    cy.request('http://106.15.78.201:8086/api/resetDB')
  })
  
  // 进入app首页
  it('visits the app root url', () => {
    cy.visit('/')

    cy.contains('p', '登录')

    cy.contains('button', 'LogOut')
  })

  // 普通用户登录
  it('normal member logs in', () => {
    cy.get('[data-test="member"]').click()

    cy.get('[data-test="username"]').type('1951001')

    cy.get('[data-test="password"]').type('qwe12345')

    cy.get('[data-test="button"]').click()

    cy.url().should('contain', '/home')
  })

  // 点击浏览商品详情
  it('click to browse details of a certain good', () => {
    cy.get('[data-test="good"]').should('have.length', 2)

    cy.get('[data-test="good"]').first().click()

    cy.url().should('contain', '/detail')
  })

  // 点击购买按钮，购买商品
  it('click purchase button to buy the good', () => {
    cy.get('[data-test="purchase"]').should('contain', '立即购买')

    cy.get('[data-test="purchase"]').click()

    cy.url().should('contain', '/order')
  })

  // 点击确认订单按钮，完成订单
  it('click confirm button to complete the order', () => {
    cy.get('[data-test="order"]').should('have.length', 1)

    cy.get('[data-test="operate"]').should('contain', '确认订单')

    cy.get('[data-test="operate"]').click()

    cy.get('[data-test="operate"]').should('contain', '举报订单')
  })

  // 点击举报订单按钮，举报订单
  it('click report button to report the order', () => {
    cy.get('[data-test="operate"]').click()

    cy.get('[data-test="operate"]').should('contain', '举报受理中')
  })

  // 管理员登录
  it('admin logs in', () => {
    cy.get('[data-test="logOut"]').click()

    cy.url().should('contain', '/')

    cy.contains('p', '登录')

    cy.get('[data-test="admin"]').click()

    cy.get('[data-test="username"]').clear().type('0001')

    cy.get('[data-test="password"]').clear().type('qwe12345')

    cy.get('[data-test="button"]').click()

    cy.url().should('contain', '/report')
  })

  // 点击封禁按钮，管理员封禁被举报的用户
  it('admin click banAccusedUser button to block the accused user', () => {
    cy.get('[data-test="report"]').should('have.length', 1)

    cy.get('[data-test="status"]').should('contain', '待处理')

    cy.get('[data-test="ban"]').should('contain', '封禁')

    cy.get('[data-test="ban"]').click()

    cy.get('[data-test="status"]').should('contain', '已封禁')

    cy.get('[data-test="ban"]').should('contain', '已处理')
  })

  // 被举报的用户登录，被阻止
  it('banned user logins and being blocked', () => {
    cy.get('[data-test="logOut"]').click()

    cy.get('[data-test="username"]').clear().type('1951002')

    cy.get('[data-test="password"]').clear().type('qwe12345')

    cy.get('[data-test="button"]').click()

    cy.get('[data-test="info"]').should('contain', '账号或密码错误')
  })
})
