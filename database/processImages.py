import glob,os,shutil
from PIL import Image

def process_image(image,destinationPath):
    x,y = image.size

    if x<y:
        margin = int((y-x)/2.)
        region = (0,margin,x,x+margin)
    elif y<x:
        margin = int((x-y)/2.)
        region = (margin,0,y+margin,y)
    else:
        region = (0,0,x,y)

    region = image.crop(region)
    region.thumbnail((256,256))
    region.save(destinationPath)
    region.thumbnail((96,96))
    region.save(destinationPath.split('.')[0]+'_thumbnail.'+destinationPath.split('.')[-1])


if os.path.isdir('profileImages'):
    shutil.rmtree('profileImages')
os.mkdir('profileImages')

source_images = glob.glob('original_images/*')
destinations = ['profileImages/'+os.path.split(i)[-1] for i in source_images]
source_images = [Image.open(i) for i in source_images]

for image,destinationPath in zip(source_images,destinations):
    process_image(image,destinationPath)