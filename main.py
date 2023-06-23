from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import motor.motor_asyncio
from datetime import datetime
from itertools import accumulate
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# cors
origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# db
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ['MONGODB_URL'])
db = client.me


# models
class Item(BaseModel):
    notes: str
    startTime: int
    endTime: int


# routes
# combine hours by day then sort by day
@app.get('/hours-per-day')
async def test():
    combinedData = {}
    rawData = await db.times.find({}).to_list(None)
    for i in rawData:
        duration = (i['endTime'] - i['startTime']) / (1000 * 60 * 60)
        day = datetime.fromtimestamp(
            i['startTime'] / 1000).__format__('%m/%d/%Y')
        if day in combinedData.keys():
            combinedData[day] += duration
        else:
            combinedData[day] = duration

    formattedData = list(map(list, combinedData.items()))
    formattedData.sort(key=lambda x: datetime.strptime(x[0], '%m/%d/%Y'))

    return {'data': formattedData}


@app.get('/cumulative-hours-per-day')
async def test():
    combinedData = {}
    rawData = await db.times.find({}).to_list(None)
    for i in rawData:
        duration = (i['endTime'] - i['startTime']) / (1000 * 60 * 60)
        day = datetime.fromtimestamp(
            i['startTime'] / 1000).__format__('%m/%d/%Y')
        if day in combinedData.keys():
            combinedData[day] += duration
        else:
            combinedData[day] = duration

    formattedData = list(map(list, combinedData.items()))
    formattedData.sort(key=lambda x: datetime.strptime(x[0], '%m/%d/%Y'))

    if len(formattedData) == 0:
        return {'data': formattedData}

    dates, durations = list(zip(*formattedData))
    durations = list(accumulate(durations))
    cumulativeData = list(map(list, zip(dates, durations)))

    return {'data': cumulativeData}


@app.post('/add')
async def add_session(item: Item):
    await db.times.insert_one(jsonable_encoder(item))
    return item


@app.get("/healthcheck")
def read_root():
    return {"status": "ok"}


# static page
app.mount('/', StaticFiles(directory='frontend/build', html=True), name='static')
