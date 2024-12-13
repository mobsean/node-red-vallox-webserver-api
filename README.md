# @mobsean/node-red-contrib-vallox-api

Integrate [Vallox](https://vallox.com/) ventilation units in your home automation project using [node-red](https://nodered.org).

This uses the build-in Vallox webserver to get and set properties of your HVAC. 

## Nodes

1. **get Profile**: Returns the current profile of the vallox unit.

![example: getProfile](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/getProfile.jpg)

2. **set Profile**: Sets the current vallox profile.

![example: setProfile](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/setProfile.jpg)

3. **get Temp**: Returns all current temperatures of the vallox unit.

![example: getTemp](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/getTemp.jpg)

4. **get Fanspeed**: Returns current fanspeeed of the vallox unit.

![example: getFanspeed](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/getFanspeed.jpg)

5. **get Mode**: Returns the current mode of the vallox unit.

![example: getMode](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/getMode.png)

6. **set Mode**: Sets the current vallox mode.

![example: setMode](https://github.com/mobsean/node-red-vallox-webserver-api/raw/main/documentation/setMode.png)

## tested with

- ValloPlus 240-E MV, Ver. 2.0.12
- ValloPlus 350 MV, Ver. 2.0.24

## thanks to
- [@danielbayerlein](https://github.com/danielbayerlein/vallox-api) for the vallox-api project
- [@torbenledermann](https://www.youtube.com/@torbenledermann) for his consice node-red videos using KNX
