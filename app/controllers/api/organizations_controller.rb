class Api::OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @organizations = Organization.all
    render json:@organizations
  end

  def show
    render json: @organization
  end

  def create
    organization = Organization.new(organization_params)

    begin
      saved = organization.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid organization'}
    end

    if saved
      return render json: {message: 'Organization successfully created!'}
    end

    return render json: {error: organization.errors.full_messages,
                         status: 422}
  end

  def update
    begin
      organization = Organization.find(params[:id])
      a = organization.update(organization_params)
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      new_organization = Project.find(params[:id])
      return render json: {message: 'Organization successfully updated!',
                           project: new_organization}
    else
      return render json: {error: organization.errors.full_messages}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(
        :email,
        :name,
        :city,
        :state,
        :link,
        :description,
        :contact_first_name,
        :contact_last_name,
        :contact_phone_number,
      )
    end
end
