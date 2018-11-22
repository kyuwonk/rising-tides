Rails.application.routes.draw do
  devise_for :organizations
  devise_for :users, path: 'users', controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :projects
  resources :applications # To be deleted, currently just for testing
  resources :users, only: [:new, :edit, :create]
  resources :organizations, only: [:edit]

  resources :projects, only: [:index, :show, :edit, :apply] do
    resources :applications, only: [:index, :show, :edit, :delete]
  end

  authenticated :user do
    root 'users#dashboard', as: :authenticated_user_root
  end

  authenticated :organization do
    root 'organizations#dashboard', as: :authenticated_organization_root
  end

  namespace :api, defaults: { format: :json } do
    resources :projects, only: [:index, :show, :create, :update, :destroy]
    resources :applications, only: [:index, :show, :create, :update, :destroy]
  end

  root 'pages#dashboard'

  get '*path' => redirect('/')
end
