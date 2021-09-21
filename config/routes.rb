Rails.application.routes.draw do
  root to: 'maps#index'
  resources :maps, only: [:index]
end
