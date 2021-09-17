'use strict';
let __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
let __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		let _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) {
						throw t[1];
					}
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) {
				throw new TypeError('Generator is already executing.');
			}
			while (_) {
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] || ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					) {
						return t;
					}
					if (((y = 0), t)) {
						op = [op[0] & 2, t.value];
					}
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) {
								_.ops.pop();
							}
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			}
			if (op[0] & 5) {
				throw op[1];
			}
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
exports.__esModule = true;
let fs = require('fs-extra');
let path = require('path');
let browserify_1 = require('browserify');
let env_1 = require('../../src/env');
let UI_FOLDER_PATH = path.join(env_1.SRC_FOLDER_PATH, 'webviews', 'ui');
let UI_JS_FOLDER_PATH = path.join(
	env_1.TS_BUILD_FOLDER_PATH,
	'src',
	'webviews',
	'ui'
);
let UI_FOLDER_BUILD_PATH = path.join(env_1.BUILD_FOLDER_PATH, 'ui');
let copyStatics = function () {
	return __awaiter(void 0, void 0, void 0, function () {
		let paths;
		return __generator(this, function (_a) {
			paths = [
				{
					src: path.join(UI_FOLDER_PATH, 'release-notes', 'release-notes.html'),
					dest: path.join(UI_FOLDER_BUILD_PATH, 'release-notes.html'),
				},
				{
					src: path.join(UI_FOLDER_PATH, 'release-notes', 'style.css'),
					dest: path.join(UI_FOLDER_BUILD_PATH, 'release-notes.css'),
				},
			];
			return [
				2 /*return*/,
				Promise.all(
					paths.map(function (path) {
						return __awaiter(void 0, void 0, void 0, function () {
							return __generator(this, function (_a) {
								return [2 /*return*/, fs.copyFile(path.src, path.dest)];
							});
						});
					})
				),
			];
		});
	});
};
let buildJs = function (type) {
	return __awaiter(void 0, void 0, void 0, function () {
		let jsBuildPath, b, jsBuildFileStream;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					jsBuildPath = path.join(UI_FOLDER_BUILD_PATH, type + '.js');
					b = browserify_1['default']();
					return [4 /*yield*/, fs.createFile(jsBuildPath)];
				case 1:
					_a.sent();
					jsBuildFileStream = fs.createWriteStream(jsBuildPath);
					b.add(path.join(UI_JS_FOLDER_PATH, type, 'index.js'));
					b.bundle().pipe(jsBuildFileStream);
					return [2 /*return*/, Promise.resolve()];
			}
		});
	});
};
let run = function () {
	return __awaiter(void 0, void 0, void 0, function () {
		let error_1;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 4, , 5]);
					return [4 /*yield*/, fs.mkdirp(UI_FOLDER_BUILD_PATH)];
				case 1:
					_a.sent();
					return [4 /*yield*/, copyStatics()];
				case 2:
					_a.sent();
					return [4 /*yield*/, buildJs('release-notes')];
				case 3:
					_a.sent();
					return [3 /*break*/, 5];
				case 4:
					error_1 = _a.sent();
					console.error('ERROR build:ui:', error_1);
					process.exit(1);
					return [3 /*break*/, 5];
				case 5:
					return [2 /*return*/];
			}
		});
	});
};
run();
