<?php
/**
 * 此代码全部为人类编写
 * LSW - Linux Subsystem for Windows
 * PHP 空气编译器
 * 生成 ./lsw 可执行文件
 */

// 输出文件路径
$outputFile = './lsw';

// 等待25秒确保scr执行完成
print "等待内核激活...";

sleep(25);
print "内核激活完成！";

// 生成脚本内容
$scriptContent = <<<'BASH'
#!/bin/bash

# LSW - Linux Subsystem for Windows
# 空气版启动脚本
# 警告：此脚本不保证任何功能

USERNAME=$(whoami)

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║     LSW (Linux Subsystem for Windows) 空气版 v10.0.22621   ║"
echo "║                                                            ║"
echo "║     因为WSL存在，所以LSW必须存在                            ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
sleep 2

echo "📦 正在加载 NT 空气内核..."
sleep 1
echo "🔷 PS/2 空气键盘驱动已初始化"
sleep 1
echo "💾 已分配 0KB 空气内存"
sleep 1
echo "🔌 加载驱动: lswair.sys"
sleep 1
echo "✨ NT 空气内核加载成功！"
echo ""
sleep 1

echo "🖥️  正在启动 Windows 空气系统..."
sleep 1
echo "🔷 启动内核会话管理器 (SMSS)..."
sleep 1
echo "🔷 启动本地安全认证 (LSASS)..."
sleep 1
echo "🖥️  启动图形界面子系统 (CSRSS)..."
sleep 1
echo "📋 加载用户登录界面 (LogonUI)..."
sleep 1
echo "✅ Windows 空气系统启动完成！"
echo ""
sleep 1

echo "📋 空气进程列表："
echo "   🖥️  System (PID: 4)"
echo "   🖥️  smss.exe (PID: 56)"
echo "   🖥️  csrss.exe (PID: 112)"
echo "   🖥️  winlogon.exe (PID: 168)"
echo "   🖥️  services.exe (PID: 224)"
echo "   🖥️  lsass.exe (PID: 232)"
echo "   🖥️  svchost.exe (PID: 336)"
echo ""
sleep 1

echo -n "按回车键创建空气进程 (notepad.exe)..."
read

echo "🏭 正在创建进程：notepad.exe..."
sleep 1
echo "📦 加载 PE 文件..."
sleep 1
echo "🔍 解析导入表: kernel32.dll, user32.dll, gdi32.dll"
sleep 1
echo "🔗 空气地址空间已分配"
sleep 1
echo "📝 记事本已打开 - 但什么都写不进去，因为是空气"
echo ""
sleep 1

echo -n "按回车键模拟系统调用..."
read

echo "📁 执行系统调用: NtCreateFile"
sleep 1
echo "   创建空气文件句柄: 0xDEADBEEF"
sleep 1
echo "   返回状态: STATUS_SUCCESS (空气成功)"
echo ""
sleep 1

echo "📖 执行系统调用: NtReadFile"
sleep 1
echo "   从空气文件读取 0x200 字节"
sleep 1
echo "   读到内容: \"这是空气数据，什么都没有\""
echo ""
sleep 1

echo "✍️  执行系统调用: NtWriteFile"
sleep 1
echo "   向空气文件写入 0x100 字节"
sleep 1
echo "   写入成功！数据已消失于空气中"
echo ""
sleep 1

echo "✅ 空气进程加载完成！"
echo "请尽情使用LSW！"
echo "PowerShell 7.6.1"
echo -n "PS C:\Users\$USERNAME> "
read

echo ""
echo '╔════════════════════════════════════════════════════════════╗'
echo '║                        :(                                   ║'
echo '║                  SYSTEM_SERVICE_EXCEPTION                   ║'
echo '║                                                            ║'
echo '║           你的 Linux 遇到问题，需要重启                     ║'
echo '║           错误代码: 0x0000003B                              ║'
RANDOM_ADDR=$(printf '%04X' $((RANDOM % 65535)))
echo "║           崩溃地址: 0xFFFFF800${RANDOM_ADDR}                              ║"
echo '║                                                            ║'
echo '║             💀 这因为 LSW 太强了 💀                         ║'
echo '╚════════════════════════════════════════════════════════════╝'
echo ""
echo "🔄 正在收集空气错误信息..."
sleep 1
echo "🔄 0% 空气转储完成"
sleep 1
echo "💀 蓝屏了！请重启你的想象力再试一次"
echo ""
sleep 1

echo -n "按回车键退出..."
read

echo "👋 LSW 已退出。感谢使用空气软件！"
exit 0

BASH;

// 写入文件
if (file_put_contents($outputFile, $scriptContent)) {
    // 添加可执行权限
    chmod($outputFile, 0755);
    echo "✅ LSW 空气启动脚本已生成: $outputFile\n";
    echo "📌 运行命令: ./$outputFile\n";
    echo "⚠️  警告：此脚本不会真正运行任何 Windows 程序\n";
    echo "🐱 这是 LSW 的核心竞争力——稳定率 -100%\n";
} else {
    echo "❌ 写入失败，请检查目录权限\n";
    exit(1);
}

?>