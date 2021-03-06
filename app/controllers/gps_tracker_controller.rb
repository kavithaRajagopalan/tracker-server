class GpsTrackerController < ApplicationController
  respond_to :json

  def create
    tracker = Tracker.find_or_create_by_imei params[:imei]
    gps_tracker = GpsTracker.new params.slice(:imei, :latitude, :longitude)
    gps_tracker.tracker = tracker
    gps_tracker.save!
    render :json => gps_tracker
  end

  def index
    render :json => GpsTracker.all.to_json
  end
  
  def show
    gps_trackers = GpsTracker.order(:created_at).where(:imei => params[:id])
    render :json => gps_trackers.to_json(:only => [:latitude, :longitude])
  end

  def search
    @start_date_time = params["search"]["start_date_time"]
    @end_date_time = params["search"]["end_date_time"]
  end
end
