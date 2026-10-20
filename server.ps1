# Servidor CDE Empresa - Google Drive Proxy en PowerShell
# Corre un servidor local HTTP en el puerto 3000 con cero dependencias externas.

$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

$PROXY_DIR = "G:\Mi unidad\CDE _PRUEBA"
$CONTRACT_DIR = Join-Path $PROXY_DIR "GE_SPI_0001\SPI_2026_001"
$STATES = @("1T", "2C", "3P", "4A")
$METADATA_FILE = Join-Path $PROXY_DIR "metadata.json"

# Asegurar directorios de estados físicos
function Ensure-Directories {
    if (-not (Test-Path $PROXY_DIR)) {
        New-Item -ItemType Directory -Path $PROXY_DIR -Force | Out-Null
    }
    foreach ($state in $STATES) {
        $statePath = Join-Path $CONTRACT_DIR $state
        if (-not (Test-Path $statePath)) {
            New-Item -ItemType Directory -Path $statePath -Force | Out-Null
        }
    }
}

# Inicializar semillas de muestra si no existe metadata
function Initialize-Workspace {
    Ensure-Directories
    
    if (-not (Test-Path $METADATA_FILE)) {
        Write-Host "Inicializando archivos semilla en CDE _PRUEBA..."
        $seedFiles = @{
            "f1" = @{
                "id" = "f1"
                "projectId" = "GE_SPI_0001"
                "phase" = "F8"
                "division" = "LZ001"
                "location" = "CP001"
                "specialty" = "CIV"
                "docType" = "PLA"
                "consecutivo" = "0001"
                "description" = "DISENO_REJA"
                "version" = 1
                "state" = "1T"
                "originalName" = "plano_rejas_v1_borrador.dwg"
                "extension" = "dwg"
                "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                "sizeBytes" = 15420
            }
            "f2" = @{
                "id" = "f2"
                "projectId" = "GE_SPI_0001"
                "phase" = "F8"
                "division" = "LZ001"
                "location" = "CM001"
                "specialty" = "MEC"
                "docType" = "MAN"
                "consecutivo" = "0001"
                "description" = "MANUAL_TURBINA_H1"
                "version" = 1
                "state" = "2C"
                "originalName" = "L1_turbine_manual_draft.pdf"
                "extension" = "pdf"
                "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                "sizeBytes" = 42104
            }
            "f3" = @{
                "id" = "f3"
                "projectId" = "GE_SPI_0001"
                "phase" = "F8"
                "division" = "LZ002"
                "location" = "UG201"
                "specialty" = "ELE"
                "docType" = "PLA"
                "consecutivo" = "0001"
                "description" = "DIAGRAMA_UNIFILAR"
                "version" = 2
                "state" = "3P"
                "originalName" = "L2-UG2-elec-unifilar-v2.pdf"
                "extension" = "pdf"
                "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                "sizeBytes" = 12504
            }
            "f4" = @{
                "id" = "f4"
                "projectId" = "GE_SPI_0001"
                "phase" = "F8"
                "division" = "LZ001"
                "location" = "TC001"
                "specialty" = "CIV"
                "docType" = "PLA"
                "consecutivo" = "0001"
                "description" = "EXCAVACION_TANQUE"
                "version" = 1
                "state" = "4A"
                "originalName" = "tanque_carga_excav_old.dwg"
                "extension" = "dwg"
                "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                "sizeBytes" = 18902
            }
        }
        
        # Escribir metadatos JSON iniciales
        $seedFiles | ConvertTo-Json -Depth 5 | Out-File -FilePath $METADATA_FILE -Encoding utf8
        
        # Escribir archivos físicos en disco
        foreach ($file in $seedFiles.Values) {
            $cdeName = "$($file.projectId)_$($file.phase)_$($file.division)_$($file.location)_$($file.specialty)_$($file.docType)_$($file.consecutivo).$($file.extension)"
            $filePath = Join-Path (Join-Path $CONTRACT_DIR $file.state) $cdeName
            if (-not (Test-Path $filePath)) {
                [System.IO.File]::WriteAllText($filePath, "Archivo semilla CDE Empresa - $($file.originalName)")
            }
        }
    } else {
        # Si ya existe metadata, comprobar que los archivos físicos estén presentes en disco
        $metadata = Get-Content -Raw -Path $METADATA_FILE | ConvertFrom-Json
        foreach ($key in $metadata.psobject.properties.Name) {
            $file = $metadata.$key
            $cdeName = "$($file.projectId)_$($file.phase)_$($file.division)_$($file.location)_$($file.specialty)_$($file.docType)_$($file.consecutivo).$($file.extension)"
            $filePath = Join-Path (Join-Path $CONTRACT_DIR $file.state) $cdeName
            if (-not (Test-Path $filePath)) {
                [System.IO.File]::WriteAllText($filePath, "Archivo recuperado CDE Empresa - $($file.originalName)")
            }
        }
    }
}

# Iniciar
Initialize-Workspace

try {
    $listener.Start()
    Write-Host "Servidor CDE Empresa corriendo en: http://localhost:$port/"
    Write-Host "Presione CTRL+C para detener."
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Cabeceras CORS por defecto
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        
        $path = $request.Url.LocalPath
        $method = $request.HttpMethod
        
        # Responder preflight OPTIONS
        if ($method -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }
        
        Write-Host "[$method] $path"
        
        # --- API: Obtener lista de archivos ---
        if ($path -eq "/api/files" -and $method -eq "GET") {
            $metadata = @{}
            if (Test-Path $METADATA_FILE) {
                $metadata = Get-Content -Raw -Path $METADATA_FILE | ConvertFrom-Json
            }
            
            # Recopilar archivos reales en el disco
            $activeFiles = New-Object System.Collections.ArrayList
            
            foreach ($state in $STATES) {
                $stateFolder = Join-Path $CONTRACT_DIR $state
                if (Test-Path $stateFolder) {
                    $items = Get-ChildItem -Path $stateFolder -File
                    foreach ($item in $items) {
                        $fileName = $item.Name
                        
                        # Buscar en metadatos
                        $found = $false
                        foreach ($key in $metadata.psobject.properties.Name) {
                            $f = $metadata.$key
                            $expectedName = "$($f.projectId)_$($f.phase)_$($f.division)_$($f.location)_$($f.specialty)_$($f.docType)_$($f.consecutivo).$($f.extension)"
                            if ($expectedName -eq $fileName -and $f.state -eq $state) {
                                $activeFiles.Add($f) | Out-Null
                                $found = $true
                                break
                            }
                        }
                        
                        # Si no tiene metadatos (archivo huérfano), parsear del nombre
                        if (-not $found) {
                            $nameWithoutExt = $item.BaseName
                            $ext = $item.Extension.Replace(".", "")
                            $codeFields = $nameWithoutExt.Split('_')
                            if ($codeFields.Length -ge 7) {
                                $orphan = @{
                                    "id" = "orphan_" + (Get-Random)
                                    "projectId" = ($codeFields[0..2] -join "_")
                                    "phase" = $codeFields[3]
                                    "division" = $codeFields[4]
                                    "location" = $codeFields[5]
                                    "specialty" = $codeFields[6]
                                    "docType" = $codeFields[7]
                                    "consecutivo" = if ($codeFields[8]) { $codeFields[8] } else { "0001" }
                                    "description" = "MIGRADO_CDE"
                                    "version" = 1
                                    "state" = $state
                                    "originalName" = $fileName
                                    "extension" = $ext
                                    "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                                    "sizeBytes" = $item.Length
                                }
                                $activeFiles.Add($orphan) | Out-Null
                            }
                        }
                    }
                }
            }
            
            $json = ConvertTo-Json -InputObject $activeFiles -Depth 5
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        
        # --- API: Carga física de archivo (JSON + Base64) ---
        elseif ($path -eq "/api/upload" -and $method -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $bodyText = $reader.ReadToEnd()
            $body = $bodyText | ConvertFrom-Json
            
            $projectId = $body.projectId
            $phase = $body.phase
            $division = $body.division
            $location = $body.location
            $specialty = $body.specialty
            $docType = $body.docType
            $consecutivo = $body.consecutivo
            $description = $body.description.ToUpper().Replace(" ", "_")
            $version = [int]$body.version
            $state = $body.state
            $originalName = $body.originalName
            $extension = $body.extension
            $fileBase64 = $body.fileBase64
            
            # Nombre de archivo CDE
            $cdeBaseName = "$projectId`_$phase`_$division`_$location`_$specialty`_$docType`_$consecutivo"
            $cdeFileName = "$cdeBaseName.$extension"
            
            # Decodificar Base64 a bytes
            $fileBytes = [System.Convert]::FromBase64String($fileBase64)
            
            # Guardar físicamente en el disco
            $stateFolder = Join-Path $CONTRACT_DIR $state
            Ensure-Directories
            $finalPath = Join-Path $stateFolder $cdeFileName
            [System.IO.File]::WriteAllBytes($finalPath, $fileBytes)
            
            # Guardar metadatos
            $metadata = @{}
            if (Test-Path $METADATA_FILE) {
                $metadata = Get-Content -Raw -Path $METADATA_FILE | ConvertFrom-Json
            }
            
            $newId = "f_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
            $newRecord = @{
                "id" = $newId
                "projectId" = $projectId
                "phase" = $phase
                "division" = $division
                "location" = $location
                "specialty" = $specialty
                "docType" = $docType
                "consecutivo" = $consecutivo
                "description" = $description
                "version" = $version
                "state" = $state
                "originalName" = $originalName
                "extension" = $extension
                "uploadDate" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
                "sizeBytes" = $fileBytes.Length
            }
            
            # Agregar nuevo registro de metadatos
            $metadata | Add-Member -MemberType NoteProperty -Name $newId -Value $newRecord -Force
            $metadata | ConvertTo-Json -Depth 5 | Out-File -FilePath $METADATA_FILE -Encoding utf8
            
            Write-Host "[CDE] Guardado físico exitoso: $cdeFileName en subcarpeta $state"
            
            $resJson = @{ "success" = $true; "file" = $newRecord } | ConvertTo-Json
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        
        # --- API: Descarga física con metadatos concatenados al vuelo ---
        elseif ($path.StartsWith("/api/download") -and $method -eq "GET") {
            # Obtener ID de la query (?id=...)
            $query = $request.Url.Query
            $fileId = ""
            if ($query.Contains("id=")) {
                $fileId = $query.Split("id=")[1].Split("&")[0]
            }
            
            $metadata = Get-Content -Raw -Path $METADATA_FILE | ConvertFrom-Json
            $fileRecord = $metadata.$fileId
            
            if (-not $fileRecord) {
                $response.StatusCode = 404
                $response.Close()
                continue
            }
            
            $cdeBaseName = "$($fileRecord.projectId)_$($fileRecord.phase)_$($fileRecord.division)_$($fileRecord.location)_$($fileRecord.specialty)_$($fileRecord.docType)_$($fileRecord.consecutivo)"
            $cdeFileName = "$cdeBaseName.$($fileRecord.extension)"
            $physicalPath = Join-Path (Join-Path $CONTRACT_DIR $fileRecord.state) $cdeFileName
            
            if (-not (Test-Path $physicalPath)) {
                $response.StatusCode = 404
                $response.Close()
                continue
            }
            
            # Nombre de descarga concatenado: [CdeName]_[description]_V[version].[ext]
            $downloadName = "$cdeBaseName`_$($fileRecord.description)`_V$($fileRecord.version).$($fileRecord.extension)"
            
            $fileBytes = [System.IO.File]::ReadAllBytes($physicalPath)
            
            $response.Headers.Add("Content-Disposition", "attachment; filename=`"$downloadName`"")
            $response.ContentType = "application/octet-stream"
            $response.ContentLength64 = $fileBytes.Length
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
            $response.Close()
        }
        
        # --- API: Borrado físico del disco y metadatos ---
        elseif ($path.StartsWith("/api/files/") -and $method -eq "DELETE") {
            $fileId = $path.Replace("/api/files/", "")
            $metadata = Get-Content -Raw -Path $METADATA_FILE | ConvertFrom-Json
            $fileRecord = $metadata.$fileId
            
            if (-not $fileRecord) {
                $response.StatusCode = 404
                $response.Close()
                continue
            }
            
            $cdeFileName = "$($fileRecord.projectId)_$($fileRecord.phase)_$($fileRecord.division)_$($fileRecord.location)_$($fileRecord.specialty)_$($fileRecord.docType)_$($fileRecord.consecutivo).$($fileRecord.extension)"
            $physicalPath = Join-Path (Join-Path $CONTRACT_DIR $fileRecord.state) $cdeFileName
            
            # Borrar del disco físico
            if (Test-Path $physicalPath) {
                Remove-Item -Path $physicalPath -Force
                Write-Host "[CDE] Borrado físico exitoso: $cdeFileName"
            }
            
            # Remover de metadata
            $metadata.PSObject.Properties.Remove($fileId)
            $metadata | ConvertTo-Json -Depth 5 | Out-File -FilePath $METADATA_FILE -Encoding utf8
            
            $resJson = @{ "success" = $true } | ConvertTo-Json
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        
        # --- API: Reiniciar Proxy (Borrar todo el disco físico y restablecer semilla) ---
        elseif ($path -eq "/api/reset" -and $method -eq "POST") {
            if (Test-Path $METADATA_FILE) {
                Remove-Item -Path $METADATA_FILE -Force
            }
            foreach ($state in $STATES) {
                $stateFolder = Join-Path $CONTRACT_DIR $state
                if (Test-Path $stateFolder) {
                    Get-ChildItem -Path $stateFolder -File | Remove-Item -Force
                }
            }
            Initialize-Workspace
            
            $resJson = @{ "success" = $true } | ConvertTo-Json
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        
        # --- Servidor Estático ---
        else {
            # Mapear URL a archivo local
            $localFile = $path.Replace("/", "\")
            if ($localFile -eq "\") { $localFile = "\index.html" }
            $fullFilePath = Join-Path $PSScriptRoot $localFile
            
            if (Test-Path $fullFilePath) {
                $ext = [System.IO.Path]::GetExtension($fullFilePath).ToLower()
                $contentType = "text/plain"
                if ($ext -eq ".html") { $contentType = "text/html; charset=utf-8" }
                elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
                elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
                elseif ($ext -eq ".json" -or $ext -eq ".mindmap") { $contentType = "application/json; charset=utf-8" }
                elseif ($ext -eq ".png") { $contentType = "image/png" }
                elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
                elseif ($ext -eq ".pdf") { $contentType = "application/pdf" }
                elseif ($ext -eq ".xlsx") { $contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
                elseif ($ext -eq ".ifc") { $contentType = "model/ifc; charset=utf-8" }
                
                $fileBytes = [System.IO.File]::ReadAllBytes($fullFilePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $fileBytes.Length
                if ($method -ne "HEAD") {
                    $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - No encontrado")
                $response.ContentType = "text/plain"
                $response.ContentLength64 = $buffer.Length
                if ($method -ne "HEAD") {
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                }
            }
            $response.Close()
        }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "Servidor detenido."
}
