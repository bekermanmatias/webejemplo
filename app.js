// Estado de la simulación
let currentStepIndex = 0;

// Definición de todos los pasos de la simulación siguiendo el documento exacto
const steps = [
    {
        step: 0,
        state: 'blue',
        stateText: 'CONFIGURACIÓN',
        icon: '🔵',
        description: 'PASO 0: Configuración del entorno. Creamos el entorno virtual e instalamos pytest. ¡Listo para comenzar con TDD!',
        testCode: '',
        sourceCode: '',
        consoleOutput: `$ python -m venv venv
$ venv\\Scripts\\activate  # En Windows
$ pip install pytest

Collecting pytest
Successfully installed pytest-7.4.3 pluggy-1.3.0

¡Entorno configurado correctamente!`,
        consoleClass: 'success'
    },
    {
        step: 1,
        state: 'red',
        stateText: 'ROJO',
        icon: '🔴',
        description: 'CICLO 1 - PASO 1.1 (ROJO 🔴): Escribimos el primer test para registrar un nuevo usuario. El test falla porque auth_service.py no existe.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True`,
        sourceCode: '',
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 1 item

test_auth_service.py::test_register_new_user FAILED                          [100%]

=================================== FAILURES ====================================
FAILED test_auth_service.py::test_register_new_user

ModuleNotFoundError: No module named 'auth_service'

================================ 1 failed in 0.xxs ===============================`,
        consoleClass: 'error'
    },
    {
        step: 2,
        state: 'green',
        stateText: 'VERDE',
        icon: '🟢',
        description: 'CICLO 1 - PASO 1.2 (VERDE 🟢): Escribimos el código MÍNIMO necesario para que el test pase. Creamos AuthService con un método register básico.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True`,
        sourceCode: `class AuthService:
    def __init__(self):
        self.users = {}
    
    def register(self, username, password):
        self.users[username] = password
        return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 1 item

test_auth_service.py::test_register_new_user PASSED                          [100%]

================================ 1 passed in 0.xxs ===============================`,
        consoleClass: 'success'
    },
    {
        step: 3,
        state: 'blue',
        stateText: 'REFACTORIZAR',
        icon: '🔵',
        description: 'CICLO 1 - PASO 1.3 (REFACTOR 🔵): El test pasa. Ahora refactorizamos: convertimos self.users en atributo privado (self._users) por convención. El test sigue pasando.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        self._users[username] = password
        return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 1 item

test_auth_service.py::test_register_new_user PASSED                          [100%]

================================ 1 passed in 0.xxs ===============================

Refactorización exitosa: Atributo privado aplicado sin romper tests.`,
        consoleClass: 'success'
    },
    {
        step: 4,
        state: 'red',
        stateText: 'ROJO',
        icon: '🔴',
        description: 'CICLO 2 - PASO 2.1 (ROJO 🔴): Nuevo test para impedir registro de usuario duplicado. El test falla porque no validamos si el usuario ya existe.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        self._users[username] = password
        return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 2 items

test_auth_service.py::test_register_new_user PASSED                          [ 50%]
test_auth_service.py::test_register_existing_user FAILED                     [ 50%]

=================================== FAILURES ====================================
FAILED test_auth_service.py::test_register_existing_user

AssertionError: assert True == False

================================ 1 failed, 1 passed in 0.xxs =====================`,
        consoleClass: 'error'
    },
    {
        step: 5,
        state: 'green',
        stateText: 'VERDE',
        icon: '🟢',
        description: 'CICLO 2 - PASO 2.2 (VERDE 🟢): Añadimos la validación para impedir usuarios duplicados. Ahora verificamos si el usuario ya existe antes de registrarlo.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 2 items

test_auth_service.py::test_register_new_user PASSED                          [ 50%]
test_auth_service.py::test_register_existing_user PASSED                     [ 50%]

================================ 2 passed in 0.xxs ===============================`,
        consoleClass: 'success'
    },
    {
        step: 6,
        state: 'red',
        stateText: 'ROJO',
        icon: '🔴',
        description: 'CICLO 3 - PASO 3.1 (ROJO 🔴): Test para permitir login de usuario exitoso. Falla porque el método login() no existe aún.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 3 items

test_auth_service.py::test_register_new_user PASSED                          [ 33%]
test_auth_service.py::test_register_existing_user PASSED                     [ 33%]
test_auth_service.py::test_login_success FAILED                              [ 33%]

=================================== FAILURES ====================================
FAILED test_auth_service.py::test_login_success

AttributeError: 'AuthService' object has no attribute 'login'

================================ 1 failed, 2 passed in 0.xxs =====================`,
        consoleClass: 'error'
    },
    {
        step: 7,
        state: 'green',
        stateText: 'VERDE',
        icon: '🟢',
        description: 'CICLO 3 - PASO 3.2 (VERDE 🟢): Implementamos el método login() básico. Verifica que el password coincida con el almacenado.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if self._users[username] == password:
            return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 3 items

test_auth_service.py::test_register_new_user PASSED                          [ 33%]
test_auth_service.py::test_register_existing_user PASSED                     [ 33%]
test_auth_service.py::test_login_success PASSED                              [ 33%]

================================ 3 passed in 0.xxs ===============================`,
        consoleClass: 'success'
    },
    {
        step: 8,
        state: 'red',
        stateText: 'ROJO',
        icon: '🔴',
        description: 'CICLO 4 - PASO 4.1 (ROJO 🔴): Test para impedir login con contraseña incorrecta. Falla porque login() no devuelve False explícitamente.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if self._users[username] == password:
            return True`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 4 items

test_auth_service.py::test_register_new_user PASSED                          [ 25%]
test_auth_service.py::test_register_existing_user PASSED                     [ 25%]
test_auth_service.py::test_login_success PASSED                              [ 25%]
test_auth_service.py::test_login_wrong_password FAILED                       [ 25%]

=================================== FAILURES ====================================
FAILED test_auth_service.py::test_login_wrong_password

AssertionError: assert None == False

================================ 1 failed, 3 passed in 0.xxs =====================`,
        consoleClass: 'error'
    },
    {
        step: 9,
        state: 'green',
        stateText: 'VERDE',
        icon: '🟢',
        description: 'CICLO 4 - PASO 4.2 (VERDE 🟢): Añadimos else para devolver False cuando la contraseña es incorrecta. Ahora manejamos ambos casos explícitamente.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if self._users[username] == password:
            return True
        else:
            return False`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 4 items

test_auth_service.py::test_register_new_user PASSED                          [ 25%]
test_auth_service.py::test_register_existing_user PASSED                     [ 25%]
test_auth_service.py::test_login_success PASSED                              [ 25%]
test_auth_service.py::test_login_wrong_password PASSED                       [ 25%]

================================ 4 passed in 0.xxs ===============================`,
        consoleClass: 'success'
    },
    {
        step: 10,
        state: 'red',
        stateText: 'ROJO',
        icon: '🔴',
        description: 'CICLO 5 - PASO 5.1 (ROJO 🔴): Test para impedir login de usuario inexistente. Falla con KeyError porque intentamos acceder a un usuario que no existe en el diccionario.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False

def test_login_user_not_found():
    service = AuthService()
    result = service.login("usuario_inexistente", "password123")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if self._users[username] == password:
            return True
        else:
            return False`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 5 items

test_auth_service.py::test_register_new_user PASSED                          [ 20%]
test_auth_service.py::test_register_existing_user PASSED                     [ 20%]
test_auth_service.py::test_login_success PASSED                              [ 20%]
test_auth_service.py::test_login_wrong_password PASSED                       [ 20%]
test_auth_service.py::test_login_user_not_found FAILED                       [ 20%]

=================================== FAILURES ====================================
FAILED test_auth_service.py::test_login_user_not_found

KeyError: 'usuario_inexistente'

================================ 1 failed, 4 passed in 0.xxs =====================`,
        consoleClass: 'error'
    },
    {
        step: 11,
        state: 'green',
        stateText: 'VERDE',
        icon: '🟢',
        description: 'CICLO 5 - PASO 5.2 (VERDE 🟢): Añadimos validación para verificar si el usuario existe antes de acceder al diccionario. Esto evita el KeyError.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False

def test_login_user_not_found():
    service = AuthService()
    result = service.login("usuario_inexistente", "password123")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if username not in self._users:
            return False
        if self._users[username] == password:
            return True
        else:
            return False`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 5 items

test_auth_service.py::test_register_new_user PASSED                          [ 20%]
test_auth_service.py::test_register_existing_user PASSED                     [ 20%]
test_auth_service.py::test_login_success PASSED                              [ 20%]
test_auth_service.py::test_login_wrong_password PASSED                       [ 20%]
test_auth_service.py::test_login_user_not_found PASSED                       [ 20%]

================================ 5 passed in 0.xxs ===============================`,
        consoleClass: 'success'
    },
    {
        step: 12,
        state: 'blue',
        stateText: 'REFACTORIZAR',
        icon: '🔵',
        description: 'PASO FINAL (REFACTORIZAR 🔵): Todos los tests pasan. Ahora REFACTORIZAMOS para mejorar la calidad del código sin cambiar funcionalidad.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False

def test_login_user_not_found():
    service = AuthService()
    result = service.login("usuario_inexistente", "password123")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        if username not in self._users:
            return False
        if self._users[username] == password:
            return True
        else:
            return False`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 5 items

test_auth_service.py::test_register_new_user PASSED                          [ 20%]
test_auth_service.py::test_register_existing_user PASSED                     [ 20%]
test_auth_service.py::test_login_success PASSED                              [ 20%]
test_auth_service.py::test_login_wrong_password PASSED                       [ 20%]
test_auth_service.py::test_login_user_not_found PASSED                       [ 20%]

================================ 5 passed in 0.xxs ===============================

Código listo para refactorizar...`,
        consoleClass: 'success'
    },
    {
        step: 13,
        state: 'blue',
        stateText: 'REFACTORIZADO',
        icon: '✅',
        description: '¡REFACTORIZACIÓN COMPLETA! Mejoras aplicadas: Uso de .get() para acceso seguro al diccionario, y simplificación del return en login(). Todos los tests siguen pasando.',
        testCode: `import pytest
from auth_service import AuthService

def test_register_new_user():
    service = AuthService()
    result = service.register("usuario1", "password123")
    assert result == True

def test_register_existing_user():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.register("usuario1", "password456")
    assert result == False

def test_login_success():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "password123")
    assert result == True

def test_login_wrong_password():
    service = AuthService()
    service.register("usuario1", "password123")
    result = service.login("usuario1", "wrongpassword")
    assert result == False

def test_login_user_not_found():
    service = AuthService()
    result = service.login("usuario_inexistente", "password123")
    assert result == False`,
        sourceCode: `class AuthService:
    def __init__(self):
        self._users = {}  # Atributo privado por convención
    
    def register(self, username, password):
        if username in self._users:
            return False
        self._users[username] = password
        return True
    
    def login(self, username, password):
        stored_password = self._users.get(username)  # Usar .get() en lugar de acceso directo
        if stored_password is None:
            return False
        return stored_password == password`,
        consoleOutput: `$ pytest test_auth_service.py -v

================================ test session starts ================================
platform win32 -- Python 3.x.x, pytest-7.4.3, pluggy-1.3.0
collected 5 items

test_auth_service.py::test_register_new_user PASSED                          [ 20%]
test_auth_service.py::test_register_existing_user PASSED                     [ 20%]
test_auth_service.py::test_login_success PASSED                              [ 20%]
test_auth_service.py::test_login_wrong_password PASSED                       [ 20%]
test_auth_service.py::test_login_user_not_found PASSED                       [ 20%]

================================ 5 passed in 0.xxs ===============================

¡Refactorización exitosa! Todas las pruebas siguen pasando, demostrando que 
el código mejorado mantiene la misma funcionalidad.`,
        consoleClass: 'success'
    }
];

// Función para actualizar la interfaz con el paso actual
function updateStep(stepIndex) {
    const step = steps[stepIndex];
    
    // Actualizar panel de estado
    const statusPanel = document.getElementById('statusPanel');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusIcon = statusIndicator.querySelector('.status-icon');
    const statusText = statusIndicator.querySelector('.status-text');
    const statusDescription = document.getElementById('statusDescription');
    
    statusPanel.className = `status-panel ${step.state}`;
    statusIcon.textContent = step.icon;
    statusText.textContent = step.stateText;
    statusDescription.textContent = step.description;
    
    // Actualizar código
    const testCodeElement = document.getElementById('testCode');
    const sourceCodeElement = document.getElementById('sourceCode');
    
    testCodeElement.textContent = step.testCode;
    sourceCodeElement.textContent = step.sourceCode;
    
    // Resaltar sintaxis con Prism
    Prism.highlightElement(testCodeElement);
    Prism.highlightElement(sourceCodeElement);
    
    // Actualizar consola
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.textContent = step.consoleOutput;
    consoleOutput.className = `console-output ${step.consoleClass}`;
    
    // Actualizar indicadores de paso
    document.getElementById('currentStep').textContent = step.step;
    document.getElementById('totalSteps').textContent = steps.length - 1;
    
    // Actualizar botones
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.disabled = stepIndex === 0;
    nextButton.disabled = stepIndex === steps.length - 1;
}

// Función para avanzar al siguiente paso
function nextStep() {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        updateStep(currentStepIndex);
    }
}

// Función para retroceder al paso anterior
function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateStep(currentStepIndex);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners
    document.getElementById('nextButton').addEventListener('click', nextStep);
    document.getElementById('prevButton').addEventListener('click', prevStep);
    
    // Soporte para teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextStep();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            prevStep();
        }
    });
    
    // Soporte táctil para móviles (gestos de deslizamiento)
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const container = document.querySelector('.container');
    
    container.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });
    
    container.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Distancia mínima para considerar swipe
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = touchEndY - touchStartY;
        
        // Solo activar si el movimiento horizontal es mayor que el vertical
        if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
            if (swipeDistanceX > swipeThreshold) {
                // Swipe derecha -> paso anterior
                prevStep();
            } else if (swipeDistanceX < -swipeThreshold) {
                // Swipe izquierda -> paso siguiente
                nextStep();
            }
        }
    }
    
    // Prevenir zoom en doble tap en iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Inicializar con el primer paso
    updateStep(0);
});
