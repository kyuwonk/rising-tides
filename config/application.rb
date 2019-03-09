require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RisingTides
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    
    Raven.configure do |config|
      config.dsn = 'https://4f736b46d91648c0b11dec8a5dc94b91:4fe55acd8c9445e59809841fb478bca1@sentry.io/1411647'
    end    
  end
end
