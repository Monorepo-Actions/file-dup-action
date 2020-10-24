"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var io = __importStar(require("@actions/io"));
var glob = __importStar(require("@actions/glob"));
var exec = __importStar(require("@actions/exec"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var cpOptions = {
    recursive: true,
    force: true,
};
var globOptions = {
    followSymbolicLinks: false,
};
var configureGit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var email, username, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = core.getInput('email');
                username = core.getInput('username');
                token = core.getInput('token');
                return [4 /*yield*/, io.mkdirP('${HOME}/project_temp/file-dup-action/')];
            case 1:
                _a.sent();
                return [4 /*yield*/, exec.exec('echo', [token, '>', '${HOME}/project_temp/file-dup-action/token.txt'])];
            case 2:
                _a.sent();
                core.info('Configure git profile.');
                return [4 /*yield*/, exec.exec('git', ['config', 'user.email', email])];
            case 3:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['config', 'user.name', username])];
            case 4:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['config', 'user.password', token])];
            case 5:
                _a.sent();
                core.info('Configure GitHub CLI.');
                return [4 /*yield*/, exec.exec('gh auth login --with-token < ${HOME}/project_temp/file-dup-action/token.txt')];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var maybeDupFile = function (target, destFiles) { return __awaiter(void 0, void 0, void 0, function () {
    var targetFilename, targetContent, outdated, _i, destFiles_1, destFile, destFilename, destContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetFilename = path_1.default.join(process.env['GITHUB_WORKSPACE'], target);
                core.info("Read " + targetFilename + ".");
                targetContent = fs_1.default.readFileSync(targetFilename, 'utf8');
                outdated = false;
                _i = 0, destFiles_1 = destFiles;
                _a.label = 1;
            case 1:
                if (!(_i < destFiles_1.length)) return [3 /*break*/, 5];
                destFile = destFiles_1[_i];
                destFilename = path_1.default.join(process.env['GITHUB_WORKSPACE'], destFile);
                core.info("Read " + destFilename + ".");
                destContent = fs_1.default.readFileSync(destFilename, 'utf8');
                core.info("Check the content of " + target + " and " + destFile + ".");
                if (!(targetContent === destContent)) return [3 /*break*/, 2];
                core.info("The content of " + target + " and " + destFile + " is the same. Skip.");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, io.cp(target, destFile, cpOptions)];
            case 3:
                _a.sent();
                outdated = true;
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, outdated];
        }
    });
}); };
var uploadChanges = function () { return __awaiter(void 0, void 0, void 0, function () {
    var method, branch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                method = core.getInput('method');
                branch = core.getInput('branch');
                if (!(method === 'push')) return [3 /*break*/, 4];
                return [4 /*yield*/, exec.exec('git', ['add', '-A'])];
            case 1:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['commit', '-m', 'chore: duplicate files'])];
            case 2:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['push', '-f', '-u', 'origin'])];
            case 3:
                _a.sent();
                return [3 /*break*/, 14];
            case 4:
                if (!(method === 'pull_request')) return [3 /*break*/, 9];
                return [4 /*yield*/, exec.exec('git', ['checkout', '-b', branch])];
            case 5:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['add', '-A'])];
            case 6:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['commit', '-m', 'chore: duplicate files'])];
            case 7:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['push', '-f', '-u', 'origin', branch])];
            case 8:
                _a.sent();
                return [3 /*break*/, 14];
            case 9:
                if (!(method === 'dry_run')) return [3 /*break*/, 13];
                return [4 /*yield*/, exec.exec('git', ['checkout', '-b', branch])];
            case 10:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['add', '-A'])];
            case 11:
                _a.sent();
                return [4 /*yield*/, exec.exec('git', ['commit', '-m', 'chore: duplicate files'])];
            case 12:
                _a.sent();
                return [3 /*break*/, 14];
            case 13: throw Error("Method " + method + " not found.");
            case 14: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var configFiles, globber, globalConfig, outdated, _a, _b, file, configContent, parsedConfig, targetFile, e_1_1, _c, _d, _i, target, dupFiles;
    var e_1, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, configureGit()];
            case 1:
                _f.sent();
                configFiles = core.getInput('config_files');
                globber = glob.create(configFiles, globOptions);
                globalConfig = {};
                outdated = false;
                _f.label = 2;
            case 2:
                _f.trys.push([2, 8, 9, 14]);
                return [4 /*yield*/, globber];
            case 3:
                _a = __asyncValues.apply(void 0, [(_f.sent()).globGenerator()]);
                _f.label = 4;
            case 4: return [4 /*yield*/, _a.next()];
            case 5:
                if (!(_b = _f.sent(), !_b.done)) return [3 /*break*/, 7];
                file = _b.value;
                core.info("Use " + file + " as a configuration file.");
                configContent = fs_1.default.readFileSync(file, 'utf8');
                core.info("Found config with content: " + configContent);
                parsedConfig = JSON.parse(configContent);
                for (targetFile in parsedConfig) {
                    globalConfig[targetFile] = parsedConfig[targetFile];
                }
                _f.label = 6;
            case 6: return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _f.trys.push([9, , 12, 13]);
                if (!(_b && !_b.done && (_e = _a.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _e.call(_a)];
            case 10:
                _f.sent();
                _f.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14:
                _c = [];
                for (_d in globalConfig)
                    _c.push(_d);
                _i = 0;
                _f.label = 15;
            case 15:
                if (!(_i < _c.length)) return [3 /*break*/, 18];
                target = _c[_i];
                dupFiles = globalConfig[target];
                core.info("Config entry " + target + " => " + JSON.stringify(dupFiles));
                return [4 /*yield*/, maybeDupFile(target, dupFiles)];
            case 16:
                if (_f.sent()) {
                    outdated = true;
                }
                _f.label = 17;
            case 17:
                _i++;
                return [3 /*break*/, 15];
            case 18:
                if (!outdated) return [3 /*break*/, 22];
                return [4 /*yield*/, uploadChanges()];
            case 19:
                _f.sent();
                if (!(core.getInput('method') === 'pull_request')) return [3 /*break*/, 21];
                return [4 /*yield*/, exec.exec('gh', [
                        'pr', 'create',
                        '--base', 'main',
                        '--head',
                        core.getInput('branch'),
                        '--title', 'chore: dup file',
                    ])];
            case 20:
                _f.sent();
                core.info('Pull request opened.');
                _f.label = 21;
            case 21: return [3 /*break*/, 23];
            case 22:
                core.info('No change needed. Skip.');
                _f.label = 23;
            case 23: return [2 /*return*/];
        }
    });
}); };
main();
