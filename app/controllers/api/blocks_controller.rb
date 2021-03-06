class API::BlocksController < ApplicationController
  before_action :set_block, only: [:show, :update, :destroy]

  # GET /blocks
  def index
    @blocks = Block.all.filter(block => block.creator = current_user)

    render json: @blocks
  end

  # GET /blocks/1
  def show
    render json: @block
  end

  # POST /blocks
  def create
    @block = Block.new(block_params)

    @block.user = current_user

    if @block.save
      render json: BlockSerializer.new(@block).serializable_hash.to_json
    else
      render json: @block.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /blocks/1
  def update
    if @block.update(block_params)
      render json: @block
    else
      render json: @block.errors, status: :unprocessable_entity
    end
  end

  # DELETE /blocks/1
  def destroy
    @block.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_block
      @block = Block.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def block_params
      params.require(:block).permit(:name, :user, :vendor_id, :share)
    end
end
