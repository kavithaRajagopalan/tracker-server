TrackerServer::Application.routes.draw do
  get "trackers/create"
  devise_for :admin_users, ActiveAdmin::Devise.config
  root :to => 'home#map'
  match 'home/route/:id' => 'home#route'
  resources :gps_tracker
  resources :tracker
  get 'home/search' => 'home#search'
  ActiveAdmin.routes(self)
end
