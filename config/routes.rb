Rails.application.routes.draw do
  devise_for :organizations, controllers: {
      sessions: 'organizations/sessions',
      registrations: 'organizations/registrations',
  }
  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :applications # To be deleted, currently just for testing
  resources :users, only: [:show]
  resources :organizations, only: [:show]

  resources :projects, only: [:index, :new, :show, :edit, :apply] do
    resources :applications, only: [:new, :show, :edit, :delete]
  end

  authenticated :user do
    root 'users#dashboard', as: :authenticated_user_root

  end

  authenticated :organization do
    root 'organizations#dashboard', as: :authenticated_organization_root
  end

  namespace :api, defaults: { format: :json } do
    resources :organizations do
      resources :projects, only: [:index]
    end
    resources :projects, only: [:index, :create, :update, :destroy] 
    resources :applications, only: [:index, :create, :update, :destroy]
  end

  root 'pages#dashboard'

  get '*path' => redirect('/')
end
