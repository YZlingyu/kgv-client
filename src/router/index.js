import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/normal/index'
import technologyChain from '@/pages/normal/technologyChain'
import entityInfo from '@/pages/normal/entityInfo'
import reportShow from '@/pages/normal/reportShow'
import createReport from '@/pages/report/createReport'
import createReportGraph from '@/pages/report/createReportGraph'
import reportManagement from '@/pages/report/reportManagement'
import createKnowledgeGraph from '@/pages/data/createKnowledgeGraph'
import editKnowledgeGraph from '@/pages/data/editKnowledgeGraph'
import login from '@/pages/admin/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/technologyChain',
      name: 'technologyChain',
      component: technologyChain
    },
    {
      path: '/entityInfo',
      name: 'entityInfo',
      component: entityInfo
    },
    {
      path: '/reportShow',
      name: 'reportShow',
      component: reportShow
    },
    {
      path: '/report/createReport',
      name: 'createReport',
      component: createReport
    },
    {
      path: '/report/createReportGraph',
      name: 'createReportGraph',
      component: createReportGraph
    },
    {
      path: '/data/createKnowledgeGraph',
      name: 'data/createKnowledgeGraph',
      component: createKnowledgeGraph
    },
    {
      path: '/report/reportManagement',
      name: 'report/reportManagement',
      component: reportManagement
    },
    {
      path: '/data/editKnowledgeGraph',
      name: 'data/editKnowledgeGraph',
      component: editKnowledgeGraph
    },
    {
      path: '/admin/login',
      name: 'admin',
      component: login
    }
  ]
})
