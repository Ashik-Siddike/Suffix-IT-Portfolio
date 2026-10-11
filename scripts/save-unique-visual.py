from pathlib import Path
from PIL import Image
import argparse
import re

parser=argparse.ArgumentParser()
parser.add_argument('--source',required=True)
parser.add_argument('--name',required=True)
args=parser.parse_args()
if not re.fullmatch(r'[a-z0-9-]+',args.name): raise ValueError('Invalid asset identifier')
root=Path(__file__).resolve().parents[1]
destination=root/'public'/'assets'/'generated'/'unique'/f'{args.name}.webp'
image=Image.open(args.source).convert('RGBA')
alpha=image.getchannel('A')
if alpha.getextrema()[0]>=250: raise ValueError('Generated asset lacks transparent background')
image.thumbnail((1200,800))
destination.parent.mkdir(parents=True,exist_ok=True)
image.save(destination,quality=87,method=4,exact=True)
print(f'Saved {args.name}; alpha {image.getchannel("A").getextrema()}.')
