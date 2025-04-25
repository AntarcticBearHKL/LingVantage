(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/audio_recorder.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAudioRecorder": (()=>useAudioRecorder)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useAudioRecorder = ()=>{
    _s();
    const [isRecording, setIsRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [audioBlob, setAudioBlob] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const mediaRecorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const startRecording = async ()=>{
        try {
            // 添加 iOS Safari 所需的约束
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    // iOS Safari 需要这些具体参数
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100,
                    channelCount: 1
                }
            });
            // 检查浏览器支持的 MIME 类型
            const mimeType = [
                'audio/webm',
                'audio/mp4',
                'audio/aac',
                'audio/ogg'
            ].find((type)=>MediaRecorder.isTypeSupported(type)) || 'audio/webm';
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType,
                audioBitsPerSecond: 128000
            });
            // 设置较小的时间片，提高兼容性
            mediaRecorderRef.current.ondataavailable = (event)=>{
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.onstop = ()=>{
                const blob = new Blob(chunksRef.current, {
                    type: mimeType
                });
                setAudioBlob(blob);
                chunksRef.current = [];
            };
            // 每秒收集一次数据，避免内存问题
            mediaRecorderRef.current.start(1000);
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            // 添加更详细的错误处理
            if (error instanceof DOMException) {
                if (error.name === 'NotAllowedError') {
                    alert('请允许访问麦克风权限');
                } else if (error.name === 'NotFoundError') {
                    alert('未找到录音设备');
                } else {
                    alert('录音初始化失败，请检查设备权限');
                }
            }
        }
    };
    const stopRecording = ()=>{
        if (mediaRecorderRef.current && isRecording) {
            try {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
                // 确保所有轨道都被正确停止
                mediaRecorderRef.current.stream.getTracks().forEach((track)=>{
                    track.stop();
                    track.enabled = false;
                });
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };
    return {
        isRecording,
        audioBlob,
        startRecording,
        stopRecording
    };
};
_s(useAudioRecorder, "BPkan/pfPQNgK4Z0ZL+AWNn6HYk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/context_section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)"); // 导入 useRouter
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio_recorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/audio_recorder.tsx [app-client] (ecmascript)"); // 导入自定义的音频录制器
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$speechSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/speechSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ContextSection = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])(); // 初始化 useRouter
    const { isRecording, audioBlob, startRecording, stopRecording } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio_recorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioRecorder"])();
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const speechText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ContextSection.useSelector[speechText]": (state)=>state.speech.speechText
    }["ContextSection.useSelector[speechText]"]);
    const handleMouseDown = ()=>{
        startRecording();
    };
    const handleMouseUp = async ()=>{
        await stopRecording();
        // 等待 audioBlob 更新
        setTimeout(async ()=>{
            if (!audioBlob) return;
            await handleUpload();
        }, 100);
    };
    const handleUpload = async ()=>{
        if (!audioBlob) return;
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            const response = await fetch('http://127.0.0.1:5000/transcribe', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            const data = await response.json();
            console.log('Upload successful:', data);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$speechSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSpeechText"])(data.text)); // 更新 Redux store 中的文本
            router.push('/context'); // 上传成功后跳转到结果页面
        } catch (error) {
            console.error('Error uploading audio:', error);
        } finally{
            setIsUploading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold text-gray-800 mb-6",
                children: "这是一个标题"
            }, void 0, false, {
                fileName: "[project]/components/context_section.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg text-gray-600 mb-8 max-w-2xl text-center",
                children: "按住按钮开始录音，松开按钮自动上传"
            }, void 0, false, {
                fileName: "[project]/components/context_section.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onMouseDown: handleMouseDown,
                        onMouseUp: handleMouseUp,
                        onMouseLeave: handleMouseUp,
                        className: `px-6 py-3 rounded-lg font-semibold ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`,
                        children: isRecording ? '录音中...' : '按住录音'
                    }, void 0, false, {
                        fileName: "[project]/components/context_section.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-600",
                        children: "上传中..."
                    }, void 0, false, {
                        fileName: "[project]/components/context_section.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/context_section.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/context_section.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
};
_s(ContextSection, "nJajJCJCkNwfVDZGUEzQvsN2BE4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$audio_recorder$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioRecorder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = ContextSection;
const __TURBOPACK__default__export__ = ContextSection;
var _c;
__turbopack_context__.k.register(_c, "ContextSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/full_page_slider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$swipeable$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-swipeable/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context_section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/context_section.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const FullPageSlider = ()=>{
    _s();
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const pages = [
        {
            id: 0,
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context_section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/full_page_slider.tsx",
                lineNumber: 12,
                columnNumber: 23
            }, this)
        },
        {
            id: 1,
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context_section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/full_page_slider.tsx",
                lineNumber: 13,
                columnNumber: 23
            }, this)
        },
        {
            id: 2,
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$context_section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/full_page_slider.tsx",
                lineNumber: 14,
                columnNumber: 23
            }, this)
        }
    ];
    const handleSwipe = (direction)=>{
        if (direction === "LEFT" && currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "RIGHT" && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$swipeable$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeable"])({
        onSwipedLeft: {
            "FullPageSlider.useSwipeable[handlers]": ()=>handleSwipe("LEFT")
        }["FullPageSlider.useSwipeable[handlers]"],
        onSwipedRight: {
            "FullPageSlider.useSwipeable[handlers]": ()=>handleSwipe("RIGHT")
        }["FullPageSlider.useSwipeable[handlers]"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...handlers,
        style: {
            display: "flex",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            position: "relative"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                transform: `translateX(-${currentPage * 100}vw)`,
                transition: "transform 0.5s ease",
                width: `${pages.length * 100}vw`
            },
            children: pages.map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen w-screen",
                    children: page.content
                }, page.id, false, {
                    fileName: "[project]/components/full_page_slider.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/full_page_slider.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/full_page_slider.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_s(FullPageSlider, "vvaF8mLcTyJxHFCE38N8exoObgs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$swipeable$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeable"]
    ];
});
_c = FullPageSlider;
const __TURBOPACK__default__export__ = FullPageSlider;
var _c;
__turbopack_context__.k.register(_c, "FullPageSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$full_page_slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/full_page_slider.tsx [app-client] (ecmascript)");
"use client";
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$full_page_slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/react-swipeable/es/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DOWN": (()=>DOWN),
    "LEFT": (()=>LEFT),
    "RIGHT": (()=>RIGHT),
    "UP": (()=>UP),
    "useSwipeable": (()=>useSwipeable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const LEFT = "Left";
const RIGHT = "Right";
const UP = "Up";
const DOWN = "Down";
/* global document */ const defaultProps = {
    delta: 10,
    preventScrollOnSwipe: false,
    rotationAngle: 0,
    trackMouse: false,
    trackTouch: true,
    swipeDuration: Infinity,
    touchEventOptions: {
        passive: true
    }
};
const initialState = {
    first: true,
    initial: [
        0,
        0
    ],
    start: 0,
    swiping: false,
    xy: [
        0,
        0
    ]
};
const mouseMove = "mousemove";
const mouseUp = "mouseup";
const touchEnd = "touchend";
const touchMove = "touchmove";
const touchStart = "touchstart";
function getDirection(absX, absY, deltaX, deltaY) {
    if (absX > absY) {
        if (deltaX > 0) {
            return RIGHT;
        }
        return LEFT;
    } else if (deltaY > 0) {
        return DOWN;
    }
    return UP;
}
function rotateXYByAngle(pos, angle) {
    if (angle === 0) return pos;
    const angleInRadians = Math.PI / 180 * angle;
    const x = pos[0] * Math.cos(angleInRadians) + pos[1] * Math.sin(angleInRadians);
    const y = pos[1] * Math.cos(angleInRadians) - pos[0] * Math.sin(angleInRadians);
    return [
        x,
        y
    ];
}
function getHandlers(set, handlerProps) {
    const onStart = (event)=>{
        const isTouch = "touches" in event;
        // if more than a single touch don't track, for now...
        if (isTouch && event.touches.length > 1) return;
        set((state, props)=>{
            // setup mouse listeners on document to track swipe since swipe can leave container
            if (props.trackMouse && !isTouch) {
                document.addEventListener(mouseMove, onMove);
                document.addEventListener(mouseUp, onUp);
            }
            const { clientX, clientY } = isTouch ? event.touches[0] : event;
            const xy = rotateXYByAngle([
                clientX,
                clientY
            ], props.rotationAngle);
            props.onTouchStartOrOnMouseDown && props.onTouchStartOrOnMouseDown({
                event
            });
            return Object.assign(Object.assign(Object.assign({}, state), initialState), {
                initial: xy.slice(),
                xy,
                start: event.timeStamp || 0
            });
        });
    };
    const onMove = (event)=>{
        set((state, props)=>{
            const isTouch = "touches" in event;
            // Discount a swipe if additional touches are present after
            // a swipe has started.
            if (isTouch && event.touches.length > 1) {
                return state;
            }
            // if swipe has exceeded duration stop tracking
            if (event.timeStamp - state.start > props.swipeDuration) {
                return state.swiping ? Object.assign(Object.assign({}, state), {
                    swiping: false
                }) : state;
            }
            const { clientX, clientY } = isTouch ? event.touches[0] : event;
            const [x, y] = rotateXYByAngle([
                clientX,
                clientY
            ], props.rotationAngle);
            const deltaX = x - state.xy[0];
            const deltaY = y - state.xy[1];
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);
            const time = (event.timeStamp || 0) - state.start;
            const velocity = Math.sqrt(absX * absX + absY * absY) / (time || 1);
            const vxvy = [
                deltaX / (time || 1),
                deltaY / (time || 1)
            ];
            const dir = getDirection(absX, absY, deltaX, deltaY);
            // if swipe is under delta and we have not started to track a swipe: skip update
            const delta = typeof props.delta === "number" ? props.delta : props.delta[dir.toLowerCase()] || defaultProps.delta;
            if (absX < delta && absY < delta && !state.swiping) return state;
            const eventData = {
                absX,
                absY,
                deltaX,
                deltaY,
                dir,
                event,
                first: state.first,
                initial: state.initial,
                velocity,
                vxvy
            };
            // call onSwipeStart if present and is first swipe event
            eventData.first && props.onSwipeStart && props.onSwipeStart(eventData);
            // call onSwiping if present
            props.onSwiping && props.onSwiping(eventData);
            // track if a swipe is cancelable (handler for swiping or swiped(dir) exists)
            // so we can call preventDefault if needed
            let cancelablePageSwipe = false;
            if (props.onSwiping || props.onSwiped || props[`onSwiped${dir}`]) {
                cancelablePageSwipe = true;
            }
            if (cancelablePageSwipe && props.preventScrollOnSwipe && props.trackTouch && event.cancelable) {
                event.preventDefault();
            }
            return Object.assign(Object.assign({}, state), {
                // first is now always false
                first: false,
                eventData,
                swiping: true
            });
        });
    };
    const onEnd = (event)=>{
        set((state, props)=>{
            let eventData;
            if (state.swiping && state.eventData) {
                // if swipe is less than duration fire swiped callbacks
                if (event.timeStamp - state.start < props.swipeDuration) {
                    eventData = Object.assign(Object.assign({}, state.eventData), {
                        event
                    });
                    props.onSwiped && props.onSwiped(eventData);
                    const onSwipedDir = props[`onSwiped${eventData.dir}`];
                    onSwipedDir && onSwipedDir(eventData);
                }
            } else {
                props.onTap && props.onTap({
                    event
                });
            }
            props.onTouchEndOrOnMouseUp && props.onTouchEndOrOnMouseUp({
                event
            });
            return Object.assign(Object.assign(Object.assign({}, state), initialState), {
                eventData
            });
        });
    };
    const cleanUpMouse = ()=>{
        // safe to just call removeEventListener
        document.removeEventListener(mouseMove, onMove);
        document.removeEventListener(mouseUp, onUp);
    };
    const onUp = (e)=>{
        cleanUpMouse();
        onEnd(e);
    };
    /**
     * The value of passive on touchMove depends on `preventScrollOnSwipe`:
     * - true => { passive: false }
     * - false => { passive: true } // Default
     *
     * NOTE: When preventScrollOnSwipe is true, we attempt to call preventDefault to prevent scroll.
     *
     * props.touchEventOptions can also be set for all touch event listeners,
     * but for `touchmove` specifically when `preventScrollOnSwipe` it will
     * supersede and force passive to false.
     *
     */ const attachTouch = (el, props)=>{
        let cleanup = ()=>{};
        if (el && el.addEventListener) {
            const baseOptions = Object.assign(Object.assign({}, defaultProps.touchEventOptions), props.touchEventOptions);
            // attach touch event listeners and handlers
            const tls = [
                [
                    touchStart,
                    onStart,
                    baseOptions
                ],
                // preventScrollOnSwipe option supersedes touchEventOptions.passive
                [
                    touchMove,
                    onMove,
                    Object.assign(Object.assign({}, baseOptions), props.preventScrollOnSwipe ? {
                        passive: false
                    } : {})
                ],
                [
                    touchEnd,
                    onEnd,
                    baseOptions
                ]
            ];
            tls.forEach(([e, h, o])=>el.addEventListener(e, h, o));
            // return properly scoped cleanup method for removing listeners, options not required
            cleanup = ()=>tls.forEach(([e, h])=>el.removeEventListener(e, h));
        }
        return cleanup;
    };
    const onRef = (el)=>{
        // "inline" ref functions are called twice on render, once with null then again with DOM element
        // ignore null here
        if (el === null) return;
        set((state, props)=>{
            // if the same DOM el as previous just return state
            if (state.el === el) return state;
            const addState = {};
            // if new DOM el clean up old DOM and reset cleanUpTouch
            if (state.el && state.el !== el && state.cleanUpTouch) {
                state.cleanUpTouch();
                addState.cleanUpTouch = void 0;
            }
            // only attach if we want to track touch
            if (props.trackTouch && el) {
                addState.cleanUpTouch = attachTouch(el, props);
            }
            // store event attached DOM el for comparison, clean up, and re-attachment
            return Object.assign(Object.assign(Object.assign({}, state), {
                el
            }), addState);
        });
    };
    // set ref callback to attach touch event listeners
    const output = {
        ref: onRef
    };
    // if track mouse attach mouse down listener
    if (handlerProps.trackMouse) {
        output.onMouseDown = onStart;
    }
    return [
        output,
        attachTouch
    ];
}
function updateTransientState(state, props, previousProps, attachTouch) {
    // if trackTouch is off or there is no el, then remove handlers if necessary and exit
    if (!props.trackTouch || !state.el) {
        if (state.cleanUpTouch) {
            state.cleanUpTouch();
        }
        return Object.assign(Object.assign({}, state), {
            cleanUpTouch: undefined
        });
    }
    // trackTouch is on, so if there are no handlers attached, attach them and exit
    if (!state.cleanUpTouch) {
        return Object.assign(Object.assign({}, state), {
            cleanUpTouch: attachTouch(state.el, props)
        });
    }
    // trackTouch is on and handlers are already attached, so if preventScrollOnSwipe changes value,
    // remove and reattach handlers (this is required to update the passive option when attaching
    // the handlers)
    if (props.preventScrollOnSwipe !== previousProps.preventScrollOnSwipe || props.touchEventOptions.passive !== previousProps.touchEventOptions.passive) {
        state.cleanUpTouch();
        return Object.assign(Object.assign({}, state), {
            cleanUpTouch: attachTouch(state.el, props)
        });
    }
    return state;
}
function useSwipeable(options) {
    const { trackMouse } = options;
    const transientState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Object.assign({}, initialState));
    const transientProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Object.assign({}, defaultProps));
    // track previous rendered props
    const previousProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Object.assign({}, transientProps.current));
    previousProps.current = Object.assign({}, transientProps.current);
    // update current render props & defaults
    transientProps.current = Object.assign(Object.assign({}, defaultProps), options);
    // Force defaults for config properties
    let defaultKey;
    for(defaultKey in defaultProps){
        if (transientProps.current[defaultKey] === void 0) {
            transientProps.current[defaultKey] = defaultProps[defaultKey];
        }
    }
    const [handlers, attachTouch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSwipeable.useMemo": ()=>getHandlers({
                "useSwipeable.useMemo": (stateSetter)=>transientState.current = stateSetter(transientState.current, transientProps.current)
            }["useSwipeable.useMemo"], {
                trackMouse
            })
    }["useSwipeable.useMemo"], [
        trackMouse
    ]);
    transientState.current = updateTransientState(transientState.current, transientProps.current, previousProps.current, attachTouch);
    return handlers;
}
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_8fea2d7a._.js.map