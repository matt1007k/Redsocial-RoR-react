json.extract! image, :id, :title, :description, :image_file, :created_at, :updated_at
json.url image_url(image, format: :json)
