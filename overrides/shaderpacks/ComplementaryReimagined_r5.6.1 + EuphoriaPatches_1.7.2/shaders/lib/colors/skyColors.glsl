#ifndef INCLUDE_SKY_COLORS
    #define INCLUDE_SKY_COLORS

    #ifdef OVERWORLD
        #if defined CLEAR_SKY_WHEN_RAINING || defined NO_RAIN_ABOVE_CLOUDS
            float rainFactorM = rainFactor * heightRelativeToCloud;
            float rainStrengthM = rainStrength * heightRelativeToCloud;
        #else
            float rainFactorM = rainFactor;
            float rainStrengthM = rainStrength;
        #endif
        float rainFactorM2 = rainFactorM * rainFactor;


        vec3 skyColorSqrt = sqrt(skyColor);
        // Doing these things because vanilla skyColor gets to 0 during a thunderstorm
        float invRainStrength2 = (1.0 - rainStrengthM) * (1.0 - rainStrengthM);
        vec3 skyColorM = mix(max(skyColorSqrt, vec3(0.63, 0.67, 0.73)), skyColorSqrt, invRainStrength2);
        vec3 skyColorM2 = mix(max(skyColor, sunFactor * vec3(0.265, 0.295, 0.35)), skyColor, invRainStrength2);
        
        #ifdef SPECIAL_BIOME_WEATHER
            vec3 nmscSnowM = inSnowy * vec3(-0.1, 0.3, 0.6);
            vec3 nmscDryM = inDry * vec3(-0.1, -0.2, -0.3);
            vec3 ndscSnowM = inSnowy * vec3(-0.25, -0.01, 0.25);
            vec3 ndscDryM = inDry * vec3(-0.05, -0.09, -0.1);
        #else
            vec3 nmscSnowM = vec3(0.0), nmscDryM = vec3(0.0), ndscSnowM = vec3(0.0), ndscDryM = vec3(0.0);
        #endif
        #if RAIN_STYLE == 2
            vec3 nmscRainMP = vec3(-0.15, 0.025, 0.1);
            vec3 ndscRainMP = vec3(-0.125, -0.005, 0.125);
            #ifdef SPECIAL_BIOME_WEATHER
                vec3 nmscRainM = inRainy * ndscRainMP;
                vec3 ndscRainM = inRainy * ndscRainMP;
            #else
                vec3 nmscRainM = ndscRainMP;
                vec3 ndscRainM = ndscRainMP;
            #endif
        #else
            vec3 nmscRainM = vec3(0.0), ndscRainM = vec3(0.0);
        #endif
        vec3 nuscWeatherM = vec3(0.1, 0.0, 0.1);
        vec3 nmscWeatherM = vec3(-0.1, -0.4, -0.6) + vec3(0.0, 0.06, 0.12) * noonFactor;
        vec3 ndscWeatherM = vec3(-0.15, -0.3, -0.42) + vec3(0.0, 0.02, 0.08) * noonFactor;

        vec3 noonUpSkyColor     = pow(skyColorM, vec3(2.9)) * (vec3(0.85, 0.92, 0.81) + rainFactorM * nuscWeatherM);
        vec3 noonMiddleSkyColor = pow(skyColorM, vec3(1.5)) * (vec3(1.35) + rainFactorM * (nmscWeatherM + nmscRainM + nmscSnowM + nmscDryM))
                                + noonUpSkyColor * 0.65;
        vec3 noonDownSkyColor   = skyColorM * (vec3(0.9) + rainFactorM * (ndscWeatherM + ndscRainM + ndscSnowM + ndscDryM))
                                + noonUpSkyColor * 0.25;

        vec3 sunsetUpSkyColor     = skyColorM2 * (vec3(0.72, 0.522, 0.47) + vec3(0.1, 0.2, 0.35) * rainFactorM2);
        vec3 sunsetMiddleSkyColor = skyColorM2 * (vec3(1.8, 1.3, 1.2) + vec3(0.15, 0.25, -0.05) * rainFactorM2);
        vec3 sunsetDownSkyColorP  = vec3(1.45, 0.86, 0.5) - vec3(0.8, 0.3, 0.0) * rainFactorM;
        vec3 sunsetDownSkyColor   = sunsetDownSkyColorP * 0.5 + 0.25 * sunsetMiddleSkyColor;

        vec3 dayUpSkyColor     = mix(noonUpSkyColor, sunsetUpSkyColor, invNoonFactor2);
        vec3 dayMiddleSkyColor = mix(noonMiddleSkyColor, sunsetMiddleSkyColor, invNoonFactor2);
        vec3 dayDownSkyColor   = mix(noonDownSkyColor, sunsetDownSkyColor, invNoonFactor2);

        vec3 nightColFactor      = 0.9 * vec3(0.07, 0.14, 0.24) * (1.0 - 0.5 * rainFactorM) + skyColor;
        vec3 nightUpSkyColor     = pow(nightColFactor, vec3(0.90)) * 0.45;
        vec3 nightMiddleSkyColor = sqrt(nightUpSkyColor) * 0.65;
        vec3 nightDownSkyColor   = nightMiddleSkyColor * vec3(0.82, 0.82, 0.88);
    #endif

#endif //INCLUDE_SKY_COLORS