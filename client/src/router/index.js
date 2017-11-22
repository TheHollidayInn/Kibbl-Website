import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'

import LoginPage from '@/components/Auth/LoginPage'
import RegisterPage from '@/components/Auth/RegisterPage'
import ResetPage from '@/components/Auth/ResetPage'
import ForgotPassword from '@/components/Auth/ForgotPassword'

import EventList from '@/components/Events/EventList'
import EventDetail from '@/components/Events/EventDetail'

import PetList from '@/components/Pets/PetList'
import PetDetail from '@/components/Pets/PetDetail'

import ShelterList from '@/components/Shelters/ShelterList'
import ShelterDetail from '@/components/Shelters/ShelterDetail'

import NotificationList from '@/components/Notifications/NotificationList'
import FollowingList from '@/components/Notifications/FollowingList'

import FavoritesList from '@/components/FavoritesList'
import MarketingPage from '@/components/MarketingPage'
import FeedbackPage from '@/components/FeedbackPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/marketing-page',
      name: 'MarketingPage',
      component: MarketingPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/feedback',
      name: 'FeedbackPage',
      component: FeedbackPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/reset-password',
      name: 'ResetPage',
      component: ResetPage
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/favorites',
      name: 'FavoritesList',
      component: FavoritesList
    },
    {
      path: '/events',
      name: 'EventList',
      component: EventList
    },
    {
      path: '/events/:eventId',
      name: 'EventDetail',
      component: EventDetail
    },
    {
      path: '/events/shelter/:shelterId',
      name: 'ShelterEventList',
      component: EventList
    },
    {
      path: '/pets',
      name: 'PetList',
      component: PetList
    },
    {
      path: '/pets/:petId',
      name: 'PetDetail',
      component: PetDetail
    },
    {
      path: '/pets/shelter/:shelterId',
      name: 'ShelterPetList',
      component: PetList
    },
    {
      path: '/shelters',
      name: 'ShelterList',
      component: ShelterList
    },
    {
      path: '/shelters/:shelterId',
      name: 'ShelterDetail',
      component: ShelterDetail
    },
    {
      path: '/following',
      name: 'FollowingList',
      component: FollowingList
    },
    {
      path: '/notifications',
      name: 'NotificationList',
      component: NotificationList
    }
  ]
})
