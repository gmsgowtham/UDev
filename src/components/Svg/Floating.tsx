import React, { FunctionComponent, memo } from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const DEFAULT_WIDTH = 865.57286;
const DEFAULT_HEIGHT = 658.54932;
const DEFAULT_ASPECT_RATIO = DEFAULT_WIDTH / DEFAULT_HEIGHT;

const FloatingSvg: FunctionComponent<Partial<SvgProps>> = (props) => {
	const { width = DEFAULT_WIDTH } = props;
	const height = parseFloat(String(width)) / DEFAULT_ASPECT_RATIO;

	return (
		<Svg
			data-name="Layer 1"
			width={width}
			height={height}
			viewBox="0 0 865.57286 658.54932"
			style={styles.container}
		>
			<Path
				d="M307.917 153.234a1.42 1.42 0 01-1.415-1.32 50.211 50.211 0 00-49.941-46.527c-1.515 0-3.106.077-4.73.229a1.42 1.42 0 01-1.365-.708 59.662 59.662 0 00-109.104 12.976 1.414 1.414 0 01-1.397 1.025l-.378-.012c-.197-.006-.393-.013-.591-.013a42.078 42.078 0 00-41.004 33.223 1.42 1.42 0 01-1.39 1.128H1.42a1.42 1.42 0 010-2.842h94.043a44.945 44.945 0 0143.483-34.35 62.503 62.503 0 01113.527-13.334 52.784 52.784 0 014.087-.163 53.062 53.062 0 0152.775 49.168 1.42 1.42 0 01-1.318 1.517 1.461 1.461 0 01-.1.003zM291.013 171.45H58.015a1.42 1.42 0 110-2.84h232.998a1.42 1.42 0 110 2.84zM114.844 192.051h-78.14a1.42 1.42 0 110-2.841h78.14a1.42 1.42 0 010 2.841z"
				fill="#cbcbcb"
			/>
			<Path
				d="M187.9 468.486c0 57.76-60.554 85.397-60.554 85.397s-61.175-27.637-62.417-85.397C64.199 434.536 92.457 407 126.415 407a61.486 61.486 0 0161.486 61.486z"
				fill="#e5e5e5"
			/>
			<Path
				fill="#cbcbcb"
				d="M147.842 557.299L106.851 557.299 101.882 537.425 152.81 537.425 147.842 557.299z"
			/>
			<Path
				fill="#fff"
				d="M108.24833 591.28757H146.44421V611.19246H108.24833z"
			/>
			<Path
				d="M146.755 611.503h-38.817v-20.526h38.817zm-38.196-.621h37.575v-19.284h-37.575z"
				fill="#cbcbcb"
			/>
			<Path
				fill="#cbcbcb"
				d="M135.176 559.643L119.517 559.643 117.72 556.819 136.973 556.819 135.176 559.643z"
			/>
			<Path
				fill="#cbcbcb"
				d="M107.16146 557.29923H107.78253000000001V587.73172H107.16146z"
			/>
			<Path
				fill="#cbcbcb"
				d="M146.91002 557.29923H147.53109V587.73172H146.91002z"
			/>
			<Path
				d="M133.572 537.088l-.38-.492c17.943-13.836 39.33-37.54 39.33-71.89a61.092 61.092 0 00-37.363-56.368l.242-.572a61.712 61.712 0 0137.743 56.94c0 34.603-21.52 58.46-39.572 72.382z"
				fill="#cbcbcb"
			/>
			<Path
				d="M113.697 537.088l-.379-.491c17.942-13.837 39.33-37.54 39.33-71.89a61.164 61.164 0 00-36.938-56.187l.247-.57a61.784 61.784 0 0137.312 56.756c0 34.603-21.52 58.461-39.572 72.382z"
				fill="#cbcbcb"
			/>
			<Path
				d="M139.132 537.088c-18.053-13.921-39.572-37.78-39.572-72.382a61.784 61.784 0 0137.313-56.756l.246.57a61.164 61.164 0 00-36.938 56.186c0 34.35 21.388 58.054 39.33 71.89z"
				fill="#cbcbcb"
			/>
			<Path
				d="M119.258 537.088c-18.053-13.921-39.572-37.779-39.572-72.382a61.669 61.669 0 0137.994-57.046l.24.573a61.05 61.05 0 00-37.613 56.473c0 34.35 21.388 58.054 39.33 71.89z"
				fill="#cbcbcb"
			/>
			<Path fill="#cbcbcb" d="M126.10413 407H126.7252V537.42495H126.10413z" />
			<Path fill="#fff" d="M108.24833 598.38284L119.63694 586.99424" />
			<Path
				transform="rotate(-45 51.821 854.896)"
				fill="#cbcbcb"
				d="M273.10322 713.10337H289.20919000000004V713.72437H273.10322z"
			/>
			<Path fill="#fff" d="M108.24833 604.60334L125.17986 586.80011" />
			<Path
				transform="rotate(-46.444 59.635 850.925)"
				fill="#cbcbcb"
				d="M271.64323 716.11655H296.21212V716.73754H271.64323z"
			/>
			<Path
				fill="#fff"
				d="M103.43503 586.80011H150.01537V592.38975H103.43503z"
			/>
			<Path
				d="M150.326 592.7h-47.201v-6.21h47.2zm-46.58-.62h45.959v-4.97h-45.96z"
				fill="#cbcbcb"
			/>
			<Path
				d="M305.09 322.106c0 38.123-39.968 56.366-39.968 56.366s-40.378-18.243-41.198-56.366c-.482-22.409 18.17-40.584 40.583-40.584a40.583 40.583 0 0140.584 40.584z"
				fill="#e5e5e5"
			/>
			<Path
				fill="#cbcbcb"
				d="M278.65 380.726L251.594 380.726 248.315 367.608 281.93 367.608 278.65 380.726z"
			/>
			<Path
				fill="#fff"
				d="M252.51682 403.15993H277.72777V416.29803H252.51682z"
			/>
			<Path
				d="M277.933 416.503h-25.621v-13.548h25.62zm-25.211-.41h24.8v-12.728h-24.8z"
				fill="#cbcbcb"
			/>
			<Path
				fill="#cbcbcb"
				d="M270.29 382.273L259.954 382.273 258.768 380.409 271.476 380.409 270.29 382.273z"
			/>
			<Path
				fill="#cbcbcb"
				d="M251.79943 380.72614H252.20936V400.81291H251.79943z"
			/>
			<Path
				fill="#cbcbcb"
				d="M278.03522 380.72614H278.44514999999996V400.81291H278.03522z"
			/>
			<Path
				d="M269.231 367.386l-.25-.325c11.843-9.132 25.96-24.778 25.96-47.45a40.323 40.323 0 00-24.662-37.206l.16-.377a40.732 40.732 0 0124.912 37.583c0 22.839-14.204 38.586-26.12 47.775z"
				fill="#cbcbcb"
			/>
			<Path
				d="M256.113 367.386l-.25-.324c11.843-9.133 25.96-24.779 25.96-47.451a40.37 40.37 0 00-24.38-37.086l.162-.376a40.78 40.78 0 0124.628 37.462c0 22.839-14.204 38.586-26.12 47.775z"
				fill="#cbcbcb"
			/>
			<Path
				d="M272.901 367.386c-11.915-9.189-26.119-24.936-26.119-47.775a40.78 40.78 0 0124.628-37.462l.163.376a40.37 40.37 0 00-24.381 37.086c0 22.672 14.117 38.318 25.96 47.45z"
				fill="#cbcbcb"
			/>
			<Path
				d="M259.783 367.386c-11.915-9.189-26.119-24.936-26.119-47.775a40.704 40.704 0 0125.078-37.653l.158.378a40.295 40.295 0 00-24.826 37.275c0 22.673 14.117 38.318 25.96 47.45z"
				fill="#cbcbcb"
			/>
			<Path
				fill="#cbcbcb"
				d="M264.30242 281.52209H264.71234999999996V367.60825H264.30242z"
			/>
			<Path fill="#fff" d="M252.51682 407.84313L260.0338 400.32615" />
			<Path
				transform="rotate(-45 194.154 666.292)"
				fill="#cbcbcb"
				d="M418.17355 524.60503H428.8042V525.0149200000001H418.17355z"
			/>
			<Path fill="#fff" d="M252.51682 411.94892L263.69236 400.19802" />
			<Path
				transform="rotate(-46.444 201.025 661.297)"
				fill="#cbcbcb"
				d="M417.2099 526.59386H433.42644V527.00374H417.2099z"
			/>
			<Path
				fill="#fff"
				d="M249.33983 400.19802H280.08489000000003V403.88743H249.33983z"
			/>
			<Path
				d="M280.29 404.092h-31.155v-4.099h31.155zm-30.745-.41h30.335v-3.279h-30.335zM644.862 374.228a1.018 1.018 0 001.014-.947 35.99 35.99 0 0135.797-33.35c1.086 0 2.226.056 3.39.164a1.018 1.018 0 00.979-.507 42.765 42.765 0 0178.205 9.301 1.014 1.014 0 001.001.735l.27-.009c.142-.004.282-.01.424-.01a30.161 30.161 0 0129.392 23.815 1.018 1.018 0 00.996.808h68.225a1.018 1.018 0 100-2.037h-67.41a32.216 32.216 0 00-31.168-24.622 44.801 44.801 0 00-81.375-9.557 37.833 37.833 0 00-2.929-.117 38.034 38.034 0 00-37.828 35.243 1.018 1.018 0 00.944 1.087c.024.002.049.003.073.003zM656.978 387.285h167.01a1.018 1.018 0 100-2.037h-167.01a1.018 1.018 0 000 2.037zM783.254 402.051h56.01a1.018 1.018 0 000-2.037h-56.01a1.018 1.018 0 100 2.037z"
				fill="#cbcbcb"
			/>
			<Path
				fill="#9f616a"
				d="M522.992 647.768L519.639 647.768 518.044 634.839 522.992 634.839 522.992 647.768z"
			/>
			<Path
				d="M523.847 651.018h-10.81v-.137a4.212 4.212 0 014.208-4.207h6.602z"
				fill="#2f2e41"
			/>
			<Path
				fill="#9f616a"
				d="M566.219 641.416L563.345 643.143 555.319 632.881 559.56 630.333 566.219 641.416z"
			/>
			<Path
				d="M559.36 649.328l-.07-.117a4.212 4.212 0 011.44-5.773l5.658-3.4 2.237 3.723zM523.863 645.1h-.058a45.014 45.014 0 01-4.88-.281c-.618-.061-1.288-.127-2.095-.194l-.028-.005c-.55-.163-.566-5.329-.332-23.01.12-9.057.255-19.321.093-25.858l-.001-.065.048-.042a24.575 24.575 0 0121.624-5.49l.059.013.03.052c3.295 5.574 8.27 13.603 13.08 21.369 11.043 17.825 14.2 23.068 13.855 23.463l-.042.032c-.754.377-1.32.668-1.802.914a59.406 59.406 0 01-5.863 2.645l-.089.036-.064-.07c-11.205-12.278-20.53-25.993-26.297-38.672-.674 4.328-1.492 9.98-2.356 15.952-2.485 17.173-4.165 28.481-4.841 29.17z"
				fill="#2f2e41"
			/>
			<Path
				d="M526.882 597.072a58.692 58.692 0 0119.626 3.286 44.673 44.673 0 00-10.015-29.125l-.05-.06.026-.072c1.76-5.086 3.58-10.343 5.205-15.573l-.024-.088c-1.14-4.053-3.588-8.15-7.482-12.522a2.396 2.396 0 00-3.27-.165 30.476 30.476 0 00-9.822 24.81l.003.026-.008.025c-3.049 10.33-4.156 15.636-5.132 20.317-.713 3.415-1.33 6.371-2.568 10.596a63.622 63.622 0 0113.511-1.455z"
				fill="#cbcbcb"
			/>
			<Path
				opacity={0.1}
				d="M536.719 564.419L526.8 586.013 521.133 580.277 536.719 564.419z"
			/>
			<Circle cx={532.47798} cy={533.75944} r={7.0569} fill="#9f616a" />
			<Path
				d="M523.922 529.773h11.205v-4.884c-2.46-.977-4.866-1.808-6.32 0a4.884 4.884 0 00-4.885 4.884z"
				fill="#2f2e41"
			/>
			<Path
				d="M535.748 524.027c6.698 0 8.573 8.397 8.573 13.134 0 2.641-1.194 3.586-3.072 3.906l-.663-3.536-1.553 3.688a71.53 71.53 0 01-1.655-.018l-.527-1.084-1.174 1.064c-4.702.007-8.503.693-8.503-4.02 0-4.737 1.644-13.134 8.574-13.134z"
				fill="#2f2e41"
			/>
			<Path
				d="M738.09 198c0 186-195 275-195 275s-197-89-201-275c-2.35-109.327 88.648-198 198-198s198 88.648 198 198z"
				fill="#6c63ff"
			/>
			<Path
				fill="#ffb7b7"
				d="M547.274 646.307L543.163 646.307 541.208 630.453 547.274 630.453 547.274 646.307z"
			/>
			<Path
				d="M540.227 645.132h7.927v4.991h-12.918a4.991 4.991 0 014.991-4.99z"
				fill="#2f2e41"
			/>
			<Path
				fill="#ffb7b7"
				d="M562.696 646.307L558.586 646.307 556.63 630.453 562.697 630.453 562.696 646.307z"
			/>
			<Path
				d="M555.65 645.132h7.927v4.991h-12.918a4.991 4.991 0 014.99-4.99z"
				fill="#2f2e41"
			/>
			<Path
				d="M562.194 599.089a3.602 3.602 0 01-.692-5.48l-2.706-38.407 7.796.756.214 37.613a3.621 3.621 0 01-4.612 5.518z"
				fill="#ffb7b7"
			/>
			<Path
				d="M547.08 638.32l-4.525-.216a1.508 1.508 0 01-1.437-1.496l-.316-45.783a1.509 1.509 0 011.725-1.504l18.102 2.628a1.5 1.5 0 011.292 1.482l2.329 42.423a1.509 1.509 0 01-1.509 1.52h-4.878a1.502 1.502 0 01-1.49-1.275s-3.685-31.82-4.191-31.802c-.509.01-3.533 32.695-3.533 32.695a1.514 1.514 0 01-1.498 1.33l-.072-.002z"
				fill="#2f2e41"
			/>
			<Path
				d="M560.56 568.108a1.503 1.503 0 01-.622-1.14l-.572-10.352a4.157 4.157 0 018.163-1.317l2.51 9.255a1.51 1.51 0 01-1.062 1.851l-7.138 1.935a1.503 1.503 0 01-1.278-.232z"
				fill="#3f3d56"
			/>
			<Circle cx={553.89292} cy={535.27109} r={8.23444} fill="#ffb7b7" />
			<Path
				d="M559.72 541.786a2.66 2.66 0 01-4.59-1.478 2.7 2.7 0 01.004-.521c.104-.99.676-1.89.539-2.935a1.539 1.539 0 00-.282-.72c-1.224-1.64-4.098.733-5.253-.751-.708-.91.124-2.343-.42-3.36-.717-1.342-2.842-.68-4.175-1.415-1.482-.818-1.394-3.093-.418-4.477a7.042 7.042 0 015.339-2.718 14.32 14.32 0 016.032 1.178 12.055 12.055 0 015.7 3.952 9.648 9.648 0 01.975 8.214c-.498 1.663-2.197 3.695-3.451 5.03z"
				fill="#2f2e41"
			/>
			<Path
				d="M562.112 549.006q-.214-.154-.437-.303a10.85 10.85 0 00-2.547-1.249v-2.163h-6.37v2.007a11.17 11.17 0 00-8.101 9.282l-4.338 32.203a1.501 1.501 0 00.312 1.14 1.482 1.482 0 001.024.561 22.773 22.773 0 018.61 2.95 12.782 12.782 0 006.271 1.6 15.117 15.117 0 005.105-.91 1.497 1.497 0 00.978-1.342c.156-3.465 1.07-21.304 3.73-32.185a11.123 11.123 0 00-4.237-11.591z"
				fill="#3f3d56"
			/>
			<Path
				fill="#3f3d56"
				d="M609.091 484L477.091 484 461.091 420 625.091 420 609.091 484z"
			/>
			<Path
				fill="#fff"
				d="M481.59087 593.4507H604.59087V657.5492899999999H481.59087z"
			/>
			<Path
				d="M605.59 658.55h-125v-66.1h125zm-123-2h121v-62.1h-121z"
				fill="#3f3d56"
			/>
			<Path
				fill="#3f3d56"
				d="M568.304 491.547L517.878 491.547 512.091 482.453 574.091 482.453 568.304 491.547z"
			/>
			<Path fill="#3f3d56" d="M478.09087 484H480.09087V582H478.09087z" />
			<Path fill="#3f3d56" d="M606.09087 484H608.09087V582H606.09087z" />
			<Path
				d="M563.138 418.916l-1.221-1.584c57.778-44.556 126.653-120.888 126.653-231.503A196.73 196.73 0 00568.25 4.309l.78-1.841a198.726 198.726 0 01121.54 183.36c0 111.428-69.298 188.257-127.432 233.088z"
				fill="#3f3d56"
			/>
			<Path
				d="M499.138 418.917l-1.222-1.584c57.779-44.557 126.654-120.889 126.654-231.504A196.962 196.962 0 00505.62 4.895l.794-1.836A198.96 198.96 0 01626.57 185.83c0 111.428-69.298 188.257-127.433 233.088z"
				fill="#3f3d56"
			/>
			<Path
				d="M581.043 418.916c-58.133-44.83-127.43-121.66-127.43-233.087A198.96 198.96 0 01573.77 3.059l.793 1.836a196.962 196.962 0 00-118.95 180.934c0 110.615 68.873 186.947 126.652 231.503z"
				fill="#3f3d56"
			/>
			<Path
				d="M517.044 418.916c-58.134-44.83-127.432-121.659-127.432-233.087A198.588 198.588 0 01511.964 2.127l.77 1.845A196.593 196.593 0 00391.613 185.83c0 110.616 68.875 186.947 126.653 231.503z"
				fill="#3f3d56"
			/>
			<Path fill="#3f3d56" d="M539.09087 0H541.09087V420H539.09087z" />
			<Path fill="#fff" d="M481.59087 616.29921L518.26494 579.62514" />
			<Path
				transform="rotate(-45 437.806 860.17)"
				fill="#3f3d56"
				d="M641.2089 717.68761H693.07404V719.6873999999999H641.2089z"
			/>
			<Path fill="#fff" d="M481.59087 636.33071L536.11449 579" />
			<Path
				transform="rotate(-46.444 451.774 862.888)"
				fill="#3f3d56"
				d="M636.50738 727.39076H715.62518V729.39049H636.50738z"
			/>
			<Path fill="#fff" d="M466.09087 579H616.09087V597H466.09087z" />
			<Path d="M617.09 598h-152v-20h152zm-150-2h148v-16h-148z" fill="#3f3d56" />
			<Path
				d="M514.605 587.372a2.75 2.75 0 002.476-3.413l8.173-5.354-4.661-2.014-7.047 5.394a2.764 2.764 0 001.06 5.387z"
				fill="#9f616a"
			/>
			<Path
				d="M522.47 583.514l-.104-.073c-1.945-1.431-4.104-2.912-6.193-4.343l-.125-.086.099-.116c4.457-5.215 8.919-10.662 13.235-15.931l-.008-.02.04-.02.017-.02.01.007.026-.013-.118.009-1.33-10.432a6.687 6.687 0 01.143-7.165 5.675 5.675 0 017.384-1.686 4.845 4.845 0 012.128 3.618 4.37 4.37 0 01-1.159 3.579 150.475 150.475 0 01.608 15.228v.048l-.029.04c-4.6 5.844-9.655 11.658-14.542 17.281z"
				fill="#cbcbcb"
			/>
			<Path
				d="M524.053 551.45a3.528 3.528 0 01.08.549l14.402 8.309 3.501-2.016 3.732 4.886-7.489 5.337-16.43-12.962a3.519 3.519 0 112.204-4.104z"
				fill="#ffb7b7"
			/>
			<Path
				d="M539.05 559.601a1.503 1.503 0 01.433-1.225l7.33-7.332a4.157 4.157 0 016.427 5.202l-5.22 8.044a1.51 1.51 0 01-2.087.444l-6.204-4.026a1.503 1.503 0 01-.68-1.107z"
				fill="#3f3d56"
			/>
			<Path
				d="M439.32 488.228a1.018 1.018 0 01-1.015-.947 35.99 35.99 0 00-35.797-33.35c-1.085 0-2.226.056-3.39.164a1.018 1.018 0 01-.978-.507 42.765 42.765 0 00-78.205 9.301 1.014 1.014 0 01-1.001.735l-.271-.009c-.14-.004-.282-.01-.424-.01a30.161 30.161 0 00-29.39 23.815 1.018 1.018 0 01-.997.808h-68.225a1.018 1.018 0 110-2.037h67.41a32.216 32.216 0 0131.167-24.622 44.801 44.801 0 0181.375-9.557 37.833 37.833 0 012.93-.117 38.034 38.034 0 0137.828 35.243 1.018 1.018 0 01-.944 1.087 1.036 1.036 0 01-.073.003zM427.204 501.285h-167.01a1.018 1.018 0 110-2.037h167.01a1.018 1.018 0 110 2.037zM300.927 516.051h-56.01a1.018 1.018 0 110-2.037h56.01a1.018 1.018 0 110 2.037z"
				fill="#cbcbcb"
			/>
		</Svg>
	);
};

const styles = StyleSheet.create({
	container: {
		aspectRatio: DEFAULT_ASPECT_RATIO,
	},
});

export default memo(FloatingSvg);
