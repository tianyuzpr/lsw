// LSW - Linux Subsystem for Windows
// TurboWarp 扩展：空气内核模拟器（纯小猫说话版 - 真·可用）

(function(Scratch) {
  'use strict';

  // 让小猫说话的辅助函数
  async function 小猫说话(message, seconds, runtime) {
    // 获取舞台
    const stage = runtime.getTargetForStage();
    
    // 找一个能说话的角色（优先找非舞台的角色）
    let speaker = null;
    const targets = runtime.targets;
    
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      if (t.isOriginal && t.sprite && t.sprite.name !== 'Stage') {
        speaker = t;
        break;
      }
    }
    
    if (!speaker) {
      speaker = stage;
    }
    
    if (speaker) {
      // 设置说话气泡
      speaker.setCustomState({
        message: message,
        messageTimestamp: Date.now()
      });
      
      // 等待指定秒数
      await new Promise(resolve => setTimeout(resolve, seconds * 1000));
      
      // 清除气泡
      speaker.setCustomState({
        message: null,
        messageTimestamp: null
      });
    }
  }

  // 空气内核状态
  let 内核已加载 = false;
  let 已蓝屏 = false;
  let 进程列表 = [];
  let runtimeInstance = null;

  class LSW空气内核 {
    constructor() {
      this.runtime = null;
    }

    // 这个方法是必须的！让扩展知道有积木
    getInfo() {
      return {
        id: 'lswKittenKernel',
        name: 'LSW 空气内核 🐱',
        color1: '#1E90FF',
        color2: '#0D6EFD',
        
        blocks: [
          {
            opcode: 'activateKernel',  // ← 这个必须和下面的函数名一致！
            blockType: Scratch.BlockType.COMMAND,
            text: '激活 LSW 空气内核'
          },
          {
            opcode: 'loadSystem',
            blockType: Scratch.BlockType.COMMAND,
            text: '加载 Windows 空气系统'
          },
          {
            opcode: 'createProcess',
            blockType: Scratch.BlockType.COMMAND,
            text: '创建进程 [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'calc.exe'
              }
            }
          },
          {
            opcode: 'syscall',
            blockType: Scratch.BlockType.COMMAND,
            text: '执行系统调用 [CALL]',
            arguments: {
              CALL: {
                type: Scratch.ArgumentType.STRING,
                menu: 'syscalls',
                defaultValue: 'NtCreateFile'
              }
            }
          },
          {
            opcode: 'blueScreen',
            blockType: Scratch.BlockType.COMMAND,
            text: '触发蓝屏死机 💀'
          },
          {
            opcode: 'readFile',
            blockType: Scratch.BlockType.COMMAND,
            text: '读取文件 [FILENAME]',
            arguments: {
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'C:\\fake.txt'
              }
            }
          },
          {
            opcode: 'writeFile',
            blockType: Scratch.BlockType.COMMAND,
            text: '写入文件 [FILENAME] 内容 [CONTENT]',
            arguments: {
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'C:\\fake.txt'
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '空气数据'
              }
            }
          },
          {
            opcode: 'enumProcesses',
            blockType: Scratch.BlockType.COMMAND,
            text: '枚举所有空气进程'
          },
          {
            opcode: 'killProcess',
            blockType: Scratch.BlockType.COMMAND,
            text: '终止进程 [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'notepad.exe'
              }
            }
          },
          {
            opcode: 'messageBox',
            blockType: Scratch.BlockType.COMMAND,
            text: '显示消息框 [TITLE] 内容 [TEXT]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'LSW 提示'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '这是一个空气消息框'
              }
            }
          },
          {
            opcode: 'getVersion',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取 LSW 空气内核版本'
          }
        ],
        
        menus: {
          syscalls: {
            acceptReporters: true,
            items: ['NtCreateFile', 'NtReadFile', 'NtWriteFile', 'NtClose', 'NtOpenProcess']
          }
        }
      };
    }

    // 这个也很重要！让扩展能访问 runtime
    setRuntime(runtime) {
      this.runtime = runtime;
      runtimeInstance = runtime;
    }

    // ========== 以下是积木对应的函数 ==========
    // 函数名必须和 opcode 完全一样！

    async activateKernel() {
      const r = this.runtime;
      内核已加载 = true;
      已蓝屏 = false;
      
      await 小猫说话("🔷 正在激活 LSW 空气内核...", 1, r);
      await 小猫说话("📦 初始化 PS/2 空气键盘驱动", 1, r);
      await 小猫说话("💾 分配 0KB 空气内存", 1, r);
      await 小猫说话("🔌 加载 NT 驱动模块", 1, r);
      await 小猫说话("✨ LSW 空气内核激活成功！", 1.5, r);
      await 小猫说话("⚠️ 提示：此内核只存在于你的想象中", 1.5, r);
    }

    async loadSystem() {
      const r = this.runtime;
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      if (已蓝屏) {
        await 小猫说话("💀 系统已蓝屏，无法加载", 1.5, r);
        return;
      }
      
      await 小猫说话("🖥️ 正在加载 Windows 空气系统...", 1, r);
      await 小猫说话("🔷 启动内核会话管理器 (SMSS)", 1, r);
      await 小猫说话("🔷 启动本地安全认证 (LSASS)", 1, r);
      await 小猫说话("🖥️ 启动图形界面子系统 (CSRSS)", 1, r);
      await 小猫说话("📋 加载用户登录界面 (LogonUI)", 1, r);
      await 小猫说话("✅ Windows 空气系统加载完成！", 1.5, r);
      await 小猫说话("👤 欢迎使用 LSW - 请用想象力操作", 1.5, r);
    }

    async createProcess(args) {
      const r = this.runtime;
      const name = args.NAME || 'unknown.exe';
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      if (已蓝屏) {
        await 小猫说话("💀 系统已蓝屏，无法创建进程", 1.5, r);
        return;
      }
      
      const pid = Math.floor(Math.random() * 10000);
      进程列表.push({ name: name, pid: pid });
      
      await 小猫说话(`🏭 正在创建进程：${name}...`, 1, r);
      await 小猫说话(`📦 加载 PE 文件：${name}`, 1, r);
      await 小猫说话(`🔍 解析导入表：kernel32.dll, user32.dll`, 1.5, r);
      await 小猫说话(`🔗 空气地址空间已分配`, 1, r);
      await 小猫说话(`🏃 进程 ${name} (PID: ${pid}) 启动成功！`, 1.5, r);
      
      if (name.toLowerCase() === 'notepad.exe') {
        await 小猫说话("📝 记事本已打开 - 但什么都写不进去，因为是空气", 1.5, r);
      } else if (name.toLowerCase() === 'calc.exe') {
        await 小猫说话("🧮 计算器已打开 - 1 + 1 = 空气", 1.5, r);
      } else if (name.toLowerCase() === 'explorer.exe') {
        await 小猫说话("📁 资源管理器已打开 - 你的空气桌面很干净", 1.5, r);
      }
    }

    async syscall(args) {
      const r = this.runtime;
      const call = args.CALL || 'NtCreateFile';
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      if (已蓝屏) {
        await 小猫说话("💀 系统已蓝屏，无法执行系统调用", 1.5, r);
        return;
      }
      
      const 模拟 = {
        'NtCreateFile': async () => {
          await 小猫说话(`📁 执行系统调用：${call}`, 0.8, r);
          await 小猫说话(`   创建空气文件句柄：0xDEADBEEF`, 1, r);
          await 小猫说话(`   返回状态：STATUS_SUCCESS`, 1, r);
        },
        'NtReadFile': async () => {
          await 小猫说话(`📖 执行系统调用：${call}`, 0.8, r);
          await 小猫说话(`   从空气文件读取 0x200 字节`, 1, r);
          await 小猫说话(`   读到内容："这是空气数据"`, 1.2, r);
        },
        'NtWriteFile': async () => {
          await 小猫说话(`✍️ 执行系统调用：${call}`, 0.8, r);
          await 小猫说话(`   向空气文件写入 0x100 字节`, 1, r);
          await 小猫说话(`   写入成功！数据已消失于空气中`, 1, r);
        },
        'NtClose': async () => {
          await 小猫说话(`🔒 执行系统调用：${call}`, 0.8, r);
          await 小猫说话(`   关闭空气句柄 0xDEADBEEF`, 1, r);
          await 小猫说话(`   句柄已释放回空气池`, 1, r);
        },
        'NtOpenProcess': async () => {
          await 小猫说话(`🔍 执行系统调用：${call}`, 0.8, r);
          await 小猫说话(`   打开空气进程 PID: 1337`, 1, r);
          await 小猫说话(`   获取空气访问权限 0x1F0FFF`, 1, r);
        }
      };
      
      const 执行 = 模拟[call] || (async () => {
        await 小猫说话(`❓ 执行系统调用：${call} (未实现)`, 1, r);
        await 小猫说话(`   返回：STATUS_NOT_IMPLEMENTED`, 1, r);
      });
      
      await 执行();
    }

    async blueScreen() {
      const r = this.runtime;
      
      内核已加载 = false;
      已蓝屏 = true;
      
      await 小猫说话("╔════════════════════════════════════════╗", 0.5, r);
      await 小猫说话("║                 :(                        ║", 0.5, r);
      await 小猫说话("║           SYSTEM_SERVICE_EXCEPTION        ║", 0.8, r);
      await 小猫说话("║                                        ║", 0.5, r);
      await 小猫说话("║    你的 Linux 遇到问题，需要重启       ║", 1, r);
      await 小猫说话("║    错误代码: 0x0000003B                  ║", 0.8, r);
      await 小猫说话("║                                        ║", 0.5, r);
      await 小猫说话("║      💀 这因为 LSW 太强了 💀           ║", 1, r);
      await 小猫说话("╚════════════════════════════════════════╝", 0.5, r);
      await 小猫说话("🔄 正在收集空气错误信息...", 1.2, r);
      await 小猫说话("0% 空气转储完成", 1, r);
      await 小猫说话("💀 请重启你的想象力再试一次", 1.5, r);
    }

    async readFile(args) {
      const r = this.runtime;
      const filename = args.FILENAME || 'C:\\fake.txt';
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      if (已蓝屏) {
        await 小猫说话("💀 系统已蓝屏，无法读取文件", 1.5, r);
        return;
      }
      
      await 小猫说话(`📂 正在读取文件：${filename}`, 1, r);
      await 小猫说话(`   正在打开空气文件句柄...`, 1, r);
      await 小猫说话(`   文件大小：0xFFFFFFFF 字节`, 1, r);
      await 小猫说话(`   内容："${'空气数据 '.repeat(2)}..."`, 1.2, r);
      await 小猫说话(`   STATUS_SUCCESS - 读取成功`, 1, r);
    }

    async writeFile(args) {
      const r = this.runtime;
      const filename = args.FILENAME || 'C:\\fake.txt';
      const content = args.CONTENT || '空内容';
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      if (已蓝屏) {
        await 小猫说话("💀 系统已蓝屏，无法写入文件", 1.5, r);
        return;
      }
      
      await 小猫说话(`📝 正在写入文件：${filename}`, 1, r);
      await 小猫说话(`   写入内容："${content}"`, 1, r);
      await 小猫说话(`   已写入 ${content.length} 字节空气数据`, 1, r);
      await 小猫说话(`   📌 文件已保存至空气目录`, 1, r);
    }

    async enumProcesses() {
      const r = this.runtime;
      
      if (!内核已加载) {
        await 小猫说话("⚠️ 内核未激活，请先激活内核", 1.5, r);
        return;
      }
      
      await 小猫说话("📋 正在枚举所有空气进程...", 1, r);
      
      if (进程列表.length === 0) {
        await 小猫说话("   暂无用户进程，显示系统空气进程：", 1, r);
        await 小猫说话("   🖥️ System (PID: 4)", 0.6, r);
        await 小猫说话("   🖥️ smss.exe (PID: 56)", 0.6, r);
        await 小猫说话("   🖥️ csrss.exe (PID: 112)", 0.6, r);
      } else {
        for (const p of 进程列表) {
          await 小猫说话(`   🖥️ ${p.name} (PID: ${p.pid})`, 0.6, r);
        }
      }
      
      await 小猫说话(`   📊 共 ${Math.max(进程列表.length, 3)} 个空气进程`, 1, r);
    }

    async killProcess(args) {
      const r = this.runtime;
      const name = args.NAME || 'notepad.exe';
      
      const index = 进程列表.findIndex(p => p.name === name);
      
      if (index !== -1) {
        const pid = 进程列表[index].pid;
        进程列表.splice(index, 1);
        await 小猫说话(`💀 正在终止进程：${name} (PID: ${pid})`, 1, r);
        await 小猫说话(`   进程退出码：0xDEADBEEF`, 1, r);
        await 小猫说话(`   ✅ 进程已终止`, 1, r);
      } else {
        await 小猫说话(`⚠️ 未找到进程：${name}`, 1, r);
        await 小猫说话(`   尝试终止一个不存在的空气进程`, 1, r);
        await 小猫说话(`   返回：STATUS_NOT_FOUND`, 1, r);
      }
    }

    async messageBox(args) {
      const r = this.runtime;
      const title = args.TITLE || 'LSW 提示';
      const text = args.TEXT || '这是一个空气消息框';
      
      await 小猫说话(`┌─────────────────────────┐`, 0.3, r);
      await 小猫说话(`│  📬 ${title}`, 0.5, r);
      await 小猫说话(`├─────────────────────────┤`, 0.3, r);
      await 小猫说话(`│  ${text}`, 0.8, r);
      await 小猫说话(`├─────────────────────────┤`, 0.3, r);
      await 小猫说话(`│        [ 确定 ]         │`, 0.5, r);
      await 小猫说话(`└─────────────────────────┘`, 0.3, r);
      await 小猫说话(`   👆 空气鼠标已点击确定`, 1, r);
    }

    getVersion() {
      return `NT 空气内核 v10.0.28000.2113 - 小猫特别版 🐱 | 稳定率: -100%`;
    }
  }

  Scratch.extensions.register(new LSW空气内核());
})(Scratch);