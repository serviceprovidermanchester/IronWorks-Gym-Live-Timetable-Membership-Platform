################################################################################
#  IronWorks Gym — Full Site Screenshots via Chrome --headless
#  Saves all pages as PNG to: ..\screenshots\
#  Usage: powershell -ExecutionPolicy Bypass -File chrome-screenshots.ps1
################################################################################

$chrome   = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir   = "C:\Users\lenovo\Desktop\GitHub\spm-web-gym-timetable\screenshots"
$baseWeb  = "http://localhost:3000"
$baseCMS  = "http://localhost:3001"

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function Take-Screenshot {
    param([string]$name, [string]$url)
    $file = "$outDir\$name.png"
    Write-Host "  📷  $name  → $url"
    $args = @(
        "--headless=new",
        "--screenshot=$file",
        "--window-size=1440,900",
        "--no-sandbox",
        "--disable-gpu",
        "--hide-scrollbars",
        "--disable-extensions",
        "--virtual-time-budget=6000",
        $url
    )
    $proc = Start-Process -FilePath $chrome -ArgumentList $args -Wait -PassThru -WindowStyle Hidden
    Start-Sleep -Milliseconds 1200
    if (Test-Path $file) {
        $kb = [math]::Round((Get-Item $file).Length / 1KB, 1)
        Write-Host "      ✅  saved ($kb KB)"
    } else {
        Write-Host "      ⚠️   file not saved (exit: $($proc.ExitCode))"
    }
}

Write-Host ""
Write-Host "========================================="
Write-Host " IronWorks Gym — Screenshot Capture"
Write-Host "========================================="
Write-Host ""

# ── PUBLIC PAGES ─────────────────────────────────────────────────────────────
Write-Host "[ PUBLIC PAGES ]"
Take-Screenshot "01-homepage"           "$baseWeb/"
Take-Screenshot "02-timetable"          "$baseWeb/timetable"
Take-Screenshot "03-membership"         "$baseWeb/membership"
Take-Screenshot "04-login"              "$baseWeb/login"
Take-Screenshot "05-register"           "$baseWeb/register"
Take-Screenshot "06-coach-sarah"        "$baseWeb/coaches/sarah-jenkins"

# ── MEMBER PORTAL ─────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ MEMBER PORTAL ]"
Take-Screenshot "07-member-dashboard"   "$baseWeb/dashboard"
Take-Screenshot "08-member-bookings"    "$baseWeb/bookings"
Take-Screenshot "09-member-profile"     "$baseWeb/profile"
Take-Screenshot "10-member-billing"     "$baseWeb/billing"

# ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ ADMIN DASHBOARD ]"
Take-Screenshot "11-admin-overview"     "$baseWeb/admin"
Take-Screenshot "12-admin-timetable"    "$baseWeb/admin/timetable"
Take-Screenshot "13-admin-members"      "$baseWeb/admin/members"
Take-Screenshot "14-admin-revenue"      "$baseWeb/admin/revenue"
Take-Screenshot "15-admin-bookings"     "$baseWeb/admin/bookings"
Take-Screenshot "16-admin-member-m001"  "$baseWeb/admin/members/m001"

# ── CMS ADMIN (port 3001) ─────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ CMS ADMIN — http://localhost:3001 ]"
Take-Screenshot "17-cms-dashboard"      "$baseCMS/admin"
Take-Screenshot "18-cms-classes"        "$baseCMS/admin/classes"
Take-Screenshot "19-cms-coaches"        "$baseCMS/admin/coaches"
Take-Screenshot "20-cms-plans"          "$baseCMS/admin/plans"
Take-Screenshot "21-cms-announcements"  "$baseCMS/admin/announcements"
Take-Screenshot "22-cms-members"        "$baseCMS/admin/members"

# ── SUMMARY ───────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "========================================="
Write-Host " SUMMARY"
Write-Host "========================================="
$files = Get-ChildItem $outDir -Filter "*.png" | Sort-Object Name
Write-Host "  $($files.Count) screenshots saved to: $outDir"
Write-Host ""
foreach ($f in $files) {
    $kb = [math]::Round($f.Length / 1KB, 1)
    Write-Host "  ✅  $($f.Name)  ($kb KB)"
}
Write-Host ""
