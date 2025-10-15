#define OVERWORLD_CURVATURE_SIZE -2048 //[-16 -32 -64 -128 -256 -512 -1024 -2048 -4096 -8192 -16384 -32768 0 32768 16384 8192 4096 2048 1024 512 256]
#define NETHER_CURVATURE_SIZE -2048 //[-16 -32 -64 -128 -256 -512 -1024 -2048 -4096 -8192 -16384 -32768 0 32768 16384 8192 4096 2048 1024 512 256]
#define END_CURVATURE_SIZE -2048 //[-16 -32 -64 -128 -256 -512 -1024 -2048 -4096 -8192 -16384 -32768 0 32768 16384 8192 4096 2048 1024 512 256]

void doMirrorDimension(inout vec4 position) {
    float y = position.y;
    float x = position.x;
    float z = position.z;
    float xz = x * x + x * z + z * z;

    float noiseNumber1 = texture2DLod(noisetex, vec2(frameTimeCounter, 0.0), 0.0).r;
    position.y += 15.0 * sin(xz * sin(frameTimeCounter * 1.3 + 25.0) / 1000.0) * noiseNumber1;

    float noiseNumber2 = sin(xz * abs(sin(frameTimeCounter * 0.1 + 540.0) / 5000.0)) * abs(sin(frameTimeCounter * 0.05 + 180.0)) * 0.5;

    position.y = x * sin(noiseNumber2) + y * cos(noiseNumber2);
    position.x = x * cos(noiseNumber2) - y * sin(noiseNumber2);
}

float doWorldCurvature(vec2 position) { // code from Complementary v4
    #ifdef NETHER
        float curvature = dot(position, position) / NETHER_CURVATURE_SIZE;
        #if NETHER_CURVATURE_SIZE == 0
            curvature *= 0.0;
        #endif
    #elif defined END
        float curvature = dot(position, position) / END_CURVATURE_SIZE;
        #if END_CURVATURE_SIZE == 0
            curvature *= 0.0;
        #endif
    #else
        float curvature = dot(position, position) / OVERWORLD_CURVATURE_SIZE;
        #if OVERWORLD_CURVATURE_SIZE == 0
            curvature *= 0.0;
        #endif
    #endif
    return curvature;
}